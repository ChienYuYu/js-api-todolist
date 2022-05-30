
const loginPage = document.querySelector('#login-page');
const signUpPage = document.querySelector('#signup-page');
const mainPage = document.querySelector('#main-page');
//登入---------------------------
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginBtn = document.querySelector('#login-btn');
const goSignUpBtn = document.querySelector('#go-signup-btn');
const warningText = document.querySelectorAll('.warning-text');

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
      //d-none d-block div
      mainPage.classList.remove('d-none')
      loginPage.classList.add('d-none')
    })

    .catch(function (error) {
      console.log(error.response)
      alert(error.response.data.message)
    });
}
//註冊---------------------------
const signUpEmail = document.querySelector('#signup-email');
const signUpNickname = document.querySelector('#signup-nickname');
const signUpPassword = document.querySelector('#signup-password');
const signUpPassword2 = document.querySelector('#signup-password2');
const signUpBtn = document.querySelector('#signup-btn');

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
    })
    .catch((error) => {
      console.log(error.response);
      alert(error.response.data.error);
    });
}
//主頁面---------------------------
const showUserName = document.querySelector('#show-user-name');
let token = "";

function getTodo() {
  axios.get('https://todoo.5xcamp.us/todos', {
    "headers": {
      "authorization": token
    }
  })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
    })
}
//---------------------------------