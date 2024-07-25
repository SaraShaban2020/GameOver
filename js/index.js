// =======global==========
const inputs =document.querySelectorAll('input');
const login_btn=document.getElementById("login");
const form=document.querySelector('form');
let isValid=false;
let themeMode=document.getElementById("mode")
let userInfo=[]
if(localStorage.getItem("theme") !=null){
    document.documentElement.setAttribute("data-theme","theme");
    if(themeMode.classList.contains("fa-sun")){
     themeMode.classList.replace("fa-sun","fa-moon");
    }else{
     themeMode.classList.replace("fa-moon","fa-sun");
    }
 }
 if(localStorage.getItem('userInfo')==null){
    userInfo=[]
 }else{
   userInfo.push(localStorage.getItem('userInfo'))
   
 }
// ==============events=========================
form.addEventListener("submit",function (e) {
    e.preventDefault();
    if(isValid==true){
        setForm()
    }
    
})
form.addEventListener("input",function(){  
 if( validationEmail() && validationPassword()){
    isValid=true;
 }else{
    isValid= false;
 }
})


function setForm(){
   const user={
    email:inputs[0].value,
    password:inputs[1].value
   }
   console.log(user)
 check(user);
}
function check(user){
    for (let i = 0; i < userInfo.length; i++) {
        if(user.email.value==userInfo[i].email&& user.password.value ==userInfo[i].password){
          location.href='./home.html'
        }else{
            let message='Incorrect Email or Password'
            document.getElementById('msg').innerHTML=message
        }
        
    }
}


// =======validation======
function validationEmail(){
    const regexStyle =
     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexStyle.test(inputs[0].value)){
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true
    }else{
        inputs[0].classList.add("is-invalid");
        inputs[0].classList.remove("is-valid"); 
        return false;
    }
};

function validationPassword(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexStyle.test(inputs[1].value)){
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true
    }else{
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid"); 
        return false;
    }
};
// ===============mode=======
themeMode.addEventListener("click",function(e){
    if(themeMode.classList.contains("fa-sun")){
      document.documentElement.setAttribute("data-theme","light");
      themeMode.classList.replace("fa-sun","fa-moon")
      localStorage.setItem("theme","light")
    }else{
     
      document.documentElement.setAttribute("data-theme","dark")
      themeMode.classList.replace("fa-moon","fa-sun")
      localStorage.setItem("theme","dark")
    }
  })