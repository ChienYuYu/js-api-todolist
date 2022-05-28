const email =document.querySelector('#email');
const password =document.querySelector('#password');
const loginBtn = document.querySelector('#login-btn');
const warningText = document.querySelectorAll('.warning-text');

loginBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  let eValue = email.value
  let pValue = password.value
  if((eValue.trim() !== '') && (pValue.trim() !== '')){
    login(eValue,pValue)
  }else{
    warningText.forEach(function(item){
      item.classList.remove('opacity-0')
    })
  }
})

function login(e,p){
  axios.post('https://todoo.5xcamp.us/users/sign_in',{
    "user": {
      "email": e,
      "password": p
    }
  })
  .then(function (response) {
    console.log(response)
    alert(response.data.message)
  })
  .catch(function (error) {
    console.log(error.response)
    alert(error.response.data.message)
  });
}