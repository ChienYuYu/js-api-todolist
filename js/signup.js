//DOM
const email = document.querySelector('#email');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const signUpBtn = document.querySelector('#signup-btn');

signUpBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  let eValue = email.value
  let nValue = nickname.value
  let pValue = password.value
  let pValue2 = password2.value
  if(pValue !== pValue2){
    alert('兩次密碼輸入不相同!')
  }else{
    signUp(eValue,nValue,pValue)
  }
})

function signUp(e,n,p){
  axios.post('https://todoo.5xcamp.us/users',{
    "user": {
      "email": e,
      "nickname": n,
      "password": p
    }
  } )
  .then((response)=> {
    console.log(response);
    alert(response.data.message);
    window.location.assign("./login.html");//轉頁面
  })
  .catch((error)=> {
    console.log(error.response);
    alert(error.response.data.error);
  });
}