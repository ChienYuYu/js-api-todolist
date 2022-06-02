
const loginSignUp = document.querySelector('#login-signup')
const loginPage = document.querySelector('#login-page');
const signUpPage = document.querySelector('#signup-page');
const mainPage = document.querySelector('#main-page');
const todoList = document.querySelector('.todolist');
const empty = document.querySelector('.empty');
// let token = "";
let todoData = []; //抓出陣列資料放這裡
const apiUrl = "https://todoo.5xcamp.us";
let tabStatus="all"; //all finished unfinished
//登入頁DOM---------------------------
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginBtn = document.querySelector('#login-btn');
const goSignUpBtn = document.querySelector('#go-signup-btn');
const warningText = document.querySelectorAll('.warning-text');
//註冊頁DOM---------------------------
const signUpEmail = document.querySelector('#signup-email');
const signUpNickname = document.querySelector('#signup-nickname');
const signUpPassword = document.querySelector('#signup-password');
const signUpPassword2 = document.querySelector('#signup-password2');
const signUpBtn = document.querySelector('#signup-btn');
const goLoginBtn = document.querySelector('#go-login-btn');
//主頁DOM-----------------------------
const showUserName = document.querySelector('#show-user-name');
const logoutBtn = document.querySelector('#logout-btn');
const inputTodo = document.querySelector('.input-todo');
const addTodoBtn = document.querySelector('.add-todo-btn');
const list = document.querySelector('.list');
const editArea = document.querySelector('.edit-area');
const newTodo = document.querySelector('.new-todo');
const tab = document.querySelector('.tab');
const showUnfinished = document.querySelector('.show-unfinished');
const deleteAllBtn = document.querySelector('.delete-all-btn');
//------------------------------------

//登入頁
//登入btn click事件
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let eValue = loginEmail.value
  let pValue = loginPassword.value
  if ((eValue.trim() !== '') && (pValue.trim() !== '')) {
    login(eValue, pValue)
  } else {
    warningText.forEach(function (item) {
      item.classList.remove('opacity-0')
    })
  }
})
//註冊頁連結 click事件
goSignUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpPage.classList.remove('d-none')
  loginPage.classList.add('d-none')
})

//註冊頁
//註冊btn click事件
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let eValue = signUpEmail.value
  let nValue = signUpNickname.value
  let pValue = signUpPassword.value
  let pValue2 = signUpPassword2.value
  if (pValue !== pValue2) {
    alert('兩次密碼輸入不相同!')
  } else {
    signUp(eValue, nValue, pValue)
  }
})
//登入頁連結 click事件
goLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPage.classList.remove('d-none')
  signUpPage.classList.add('d-none')
})

//渲染資料 renderData()---
function renderData() {
  let str = ""
  let count = 0
  todoData.forEach(function (item, index) {
    if(item.completed_at === null){count+=1}
    if((item.completed_at === null) && (tabStatus == 'all'||tabStatus =='unfinished')){
      str += `<li>
      <label class="d-flex align-items-center border-bottom">
        <input type="checkbox" class="m-3"data-element="check-todo"data-id="${item.id}">
        <span>${item.content}</span>
        <a href="#" class="bi bi-pencil text-decoration-none text-dark p-3 ms-auto" data-id="${item.id}" data-element="edit-btn"></a>
        <a href="#" class="bi bi-x-lg text-decoration-none text-dark p-3" data-id="${item.id}" data-element="delete-btn"></a>
      </label>
    </li>`
    }else if((item.completed_at !== null) && (tabStatus == 'all'||tabStatus =='finished')){
      str += `<li>
      <label class="d-flex align-items-center border-bottom">
        <input type="checkbox" class="m-3"data-element="check-todo"data-id="${item.id}" checked>
        <span>${item.content}</span>
        <a href="#" class="bi bi-pencil text-decoration-none text-dark p-3 ms-auto" data-id="${item.id}" data-element="edit-btn"></a>
        <a href="#" class="bi bi-x-lg text-decoration-none text-dark p-3" data-id="${item.id}" data-element="delete-btn"></a>
      </label>
    </li>`
    }

  })
  showUnfinished.innerHTML = `${count}個待完成項目`
  list.innerHTML = str
}

//登出 btn click事件----
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
})

//新增待辦 btn click事件-----
addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let todoItem = inputTodo.value
  addTodo(todoItem)
  inputTodo.value = ''
})
//鍵盤新增 Enter keypress事件------
inputTodo.addEventListener('keypress',(e)=>{
  let todoItem = inputTodo.value
  if(e.key === 'Enter'){
    addTodo(todoItem)
    inputTodo.value = ''
  }
  
})

//刪除&編輯&打勾---父層綁監聽抓子層---
list.addEventListener('click', function (e) {
  let id = e.target.getAttribute('data-id')
  //叉叉 icon (刪除)
  if (e.target.getAttribute('data-element') == 'delete-btn') {
    e.preventDefault()
    deleteTodo(id)
  }
  //鉛筆 icon (編輯)
  if (e.target.getAttribute('data-element') == 'edit-btn') {
    e.preventDefault()
    editArea.classList.remove('d-none')//顯示編輯視窗
    editArea.setAttribute('data-id',id)
  }
  //打勾 切換狀態
  if(e.target.getAttribute('data-element') == 'check-todo'){
    statusToggle(id)
  }
})

//編輯視窗 click事件----------
editArea.addEventListener('click', (e) => {
  let ntValue = newTodo.value
  let id = editArea.getAttribute('data-id')
  if ((e.target.getAttribute('data-element') === 'confirm-btn') &&
  (ntValue.trim() !== "")) {
    e.preventDefault()
    editTodo(id, ntValue)
    editArea.classList.add('d-none')
  } else if (e.target.getAttribute('data-element') === 'cancel-btn') {
    e.preventDefault()
    editArea.classList.add('d-none')
  } else { return }
  newTodo.value = ""//清除欄位文字
})

//tab切換 click事件
tab.addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    let tabItem = document.querySelectorAll('.tab a')
    tabItem.forEach((item) => {
      item.classList.remove('border-bottom')
      item.classList.remove('text-dark')
    })
    e.target.classList.add('border-bottom')
    e.target.classList.add('text-dark')
  } else { return }
  tabStatus = e.target.getAttribute('data-status');
  getTodo();
})

//刪除全部 btn click事件
deleteAllBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  todoData.forEach(item=>{
    if(item.completed_at !== null){
      deleteTodo(item.id)
    }
  })
})

//------------API---------------//
//註冊API signUp()----------
function signUp(e, n, p) {
  axios.post(`${apiUrl}/users`, {
    "user": {
      "email": e,
      "nickname": n,
      "password": p
    }
  })
    .then((response) => {
      console.log(response);
      alert(response.data.message);
      loginPage.classList.remove('d-none')
      signUpPage.classList.add('d-none')
    })
    .catch((error) => {
      console.log(error.response);
      alert(error.response.data.error);
    });
}
//登入API login()----------
function login(e, p) {
  axios.post(`${apiUrl}/users/sign_in`, {
    "user": {
      "email": e,
      "password": p
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data.message)
      //預設所有axios帶上token↓//用這個後登出後無法再登入要重整才行(待確認)
      axios.defaults.headers.common['Authorization'] = response.headers.authorization
      // token = response.headers.authorization
      loginSignUp.classList.add('d-none')
      mainPage.classList.remove('d-none')
      showUserName.textContent = response.data.nickname
      getTodo()
    })

    .catch(function (error) {
      console.log(error.response)
      alert(error.response.data.message)
    });
}
//登出API logout()----------
function logout() {
  axios.delete(`${apiUrl}/users/sign_out`)
    .then((response) => {
      console.log(response)
      alert(response.data.message)
      mainPage.classList.add('d-none')
      loginSignUp.classList.remove('d-none')
      inputTodo.value = ''//清空新增欄位文字
    })
    .catch((error) => console.log(error.response))
}
//取得資料API getTodo()-------------
function getTodo() {
  axios.get(`${apiUrl}/todos`)
    .then(function (response) {
      console.log(response);
      // 有待辦無待辦顯示不同畫面---
      if (response.data.todos.length === 0) {
        empty.classList.remove('d-none')
        todoList.classList.add('d-none')
      } else {
        todoList.classList.remove('d-none')
        empty.classList.add('d-none')
      }
      // 把陣列資料抓出放todoData[]裡---
      todoData = response.data.todos
      renderData()//渲染資料
    })
    .catch(function (error) {
      console.log(error.response);
    })
}
//新增API addTodo()----------
function addTodo(item) {
  axios.post(`${apiUrl}/todos`, {
    "todo": {
      "content": item
    }
  })
    .then((response) => {
      console.log(response);
      getTodo()
    })
    .catch((error) => console.log(error.response))
}
//編輯API editTodo()----------
function editTodo(id, ntValue) {
  axios.put(`${apiUrl}/todos/${id}`, {
    "todo": {
      "content": ntValue
    }
  })
  .then(res => {
    console.log(res)
    getTodo()
  })
  .catch(error => console.log(error.response))
}
//刪除API deleteTodo()----------
function deleteTodo(id) {
  axios.delete(`${apiUrl}/todos/${id}`)
    .then((res) => {
      console.log(res)
      getTodo()
    })
    .catch(error => console.log(error.response))
}
//已完成/待完成切換API statusToggle()----------
function statusToggle(id){
  axios.patch(`${apiUrl}/todos/${id}/toggle`)
  .then(res=>{
    console.log(res)
    getTodo()
  })
  .catch(error => console.log(error.response))
}
