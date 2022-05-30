const showUserName = document.querySelector('#show-user-name');
let token="";

function getTodo(){
  axios.get('https://todoo.5xcamp.us/todos',{
    "headers":{
      "authorization":token
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


getTodo()