
const loginSignUp =document.querySelector('#login-signup')
const loginPage = document.querySelector('#login-page');
const signUpPage = document.querySelector('#signup-page');
const mainPage = document.querySelector('#main-page');
const todoList = document.querySelector('.todolist');
const empty = document.querySelector('.empty');
// let token = "";
let todoData = [];//抓出陣列資料放這裡
const apiUrl ="https://todoo.5xcamp.us";
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
const deleteBtn = document.querySelectorAll('.delete-btn');
//------------------------------------

//登入頁----
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
//前往註冊頁連結
goSignUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpPage.classList.remove('d-none')
  loginPage.classList.add('d-none')
})
// login()
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
//註冊頁---
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
//前往登入頁連結
goLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginPage.classList.remove('d-none')
  signUpPage.classList.add('d-none')
})
//signUp()
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

//取得資料-getTodo()---
function getTodo() {
  axios.get(`${apiUrl}/todos`)
    .then(function (response) {
      console.log(response);
      // 有待辦無待辦顯示不同畫面---
      if(response.data.todos.length === 0){
        empty.classList.remove('d-none')
        todoList.classList.add('d-none')
      }else{
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
//渲染資料 renderData()---
function renderData(){
  let str=""
  todoData.forEach(function(item,index){
  str +=`<li>
    <label class="d-flex align-items-center border-bottom">
      <input type="checkbox" class="m-3">
      <span>${item.content}</span>
      <a href="#" class="bi bi-pencil text-decoration-none text-dark p-3 ms-auto" data-id="${item.id}"></a>
      <a href="#" class="bi bi-x-lg text-decoration-none text-dark p-3" data-id="${item.id}" data-element="delete-btn"></a>
    </label>
  </li>`
  
  })
  list.innerHTML = str
}

//登出-------------
logoutBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  logout();
})
//logout()
function logout(){
  axios.delete(`${apiUrl}/users/sign_out`)
  .then((response)=>{
    console.log(response)
    alert(response.data.message)
    mainPage.classList.add('d-none')
    loginSignUp.classList.remove('d-none')
  })
  .catch((error)=>console.log(error.response))
}
//新增-----
addTodoBtn.addEventListener('click',()=>{
  let todoItem = inputTodo.value
  addTodo(todoItem)
  inputTodo.value = ''
})
//鍵盤Enter新增------(待做)
function addTodo(item){
  axios.post(`${apiUrl}/todos`,{
    "todo": {
      "content": item
    }
  })
  .then((response)=>{
    console.log(response);
    getTodo()
  })
  .catch((error)=>console.log(error.response))
}

//刪除------
list.addEventListener('click',function(e){
  let id = e.target.getAttribute('data-id')
  if(e.target.getAttribute('data-element') == 'delete-btn'){
    e.preventDefault()
    deleteTodo(id)
  }
})

function deleteTodo(id){
  axios.delete(`${apiUrl}/todos/${id}`)
  .then((res)=>{
    console.log(res)
    getTodo()
  })
  .catch(error=>console.log(error.response))
}