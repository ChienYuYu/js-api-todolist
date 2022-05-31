
const loginSignUp =document.querySelector('#login-signup')
const loginPage = document.querySelector('#login-page');
const signUpPage = document.querySelector('#signup-page');
const mainPage = document.querySelector('#main-page');
const todoList = document.querySelector('.todolist');
const empty = document.querySelector('.empty');
let token = "";
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
//------------------------------------

//登入頁---------------------------
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

function login(e, p) {
  axios.post('https://todoo.5xcamp.us/users/sign_in', {
    "user": {
      "email": e,
      "password": p
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data.message)
      token = response.headers.authorization
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
//註冊頁---------------------------
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

function signUp(e, n, p) {
  axios.post('https://todoo.5xcamp.us/users', {
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

//主頁面---------------------------
function getTodo() {
  axios.get('https://todoo.5xcamp.us/todos', {
    "headers": {
      "authorization": token
    }
  })
    .then(function (response) {
      console.log(response);
      if(response.data.todos.length === 0){
        empty.classList.remove('d-none')
        todoList.classList.add('d-none')
      }else{
        todoList.classList.remove('d-none')
        empty.classList.add('d-none')
      }
    })
    .catch(function (error) {
      console.log(error.response);
    })
}
//登出-------------
logoutBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  logout();
})
//詢問問題:為什麼第二個參數不能寫token? 要用物件?
function logout(){
  axios.delete('https://todoo.5xcamp.us/users/sign_out',{
    "headers": {
      "authorization": token
    }
  })
  .then((response)=>{
    console.log(response)
    alert(response.data.message)
    mainPage.classList.add('d-none')
    loginSignUp.classList.remove('d-none')
  })
  .catch((error)=>console.log(error.response))
}
//新增---------------------
addTodoBtn.addEventListener('click',()=>{
  let todoItem = inputTodo.value;
  addTodo(todoItem)
})

function addTodo(item){
  axios.post('https://todoo.5xcamp.us/todos',{
    "todo": {
      "content": item
    }
  },{
    "headers": {
      "authorization": token
    }
  })
  .then((response)=>{
    console.log(response);
    // getTodo()
  })
  .catch((error)=>console.log(error.response))
}

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjg0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjUzOTY2NDU5LCJleHAiOjE2NTUyNjI0NTksImp0aSI6IjVkMWI1Y2YwLTAxOTgtNDE5OS05NDlhLTJiMDJlMDA4NGZiYSJ9.Sa1ACu_00C6Wa-_kLsvx22S-wLNvfEC4T-Pv_jIfNa0

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjg0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjUzOTY2NjY5LCJleHAiOjE2NTUyNjI2NjksImp0aSI6ImE3Y2JhNmI4LTVkN2UtNGM4MS05ZmQyLWM2Njc1ZmRiNzYyMyJ9.Rjzj-eBHWE2xjMoBuEdY4uCcYX5k4I1NCZoGhlm4S-M

// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjg0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjUzOTY2NzYxLCJleHAiOjE2NTUyNjI3NjEsImp0aSI6IjY0OGYxMzM4LTg2YzYtNDZiMy05NWRjLTJmNDFkMTA4NjUwYSJ9.IgWdzmzOxBIZ06Sx1LIfIfUjWwMWA3vBQ9wgJytwOfg