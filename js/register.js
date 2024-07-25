// =======global==========
const inputs =document.querySelectorAll('input');
const register_btn=document.getElementById("register");
const form=document.querySelector('form');
let themeMode=document.getElementById("mode")
let isValid=false;
let users=[]
if(localStorage.getItem("theme") !=null){
    document.documentElement.setAttribute("data-theme","theme");
    if(themeMode.classList.contains("fa-sun")){
     themeMode.classList.replace("fa-sun","fa-moon");
    }else{
     themeMode.classList.replace("fa-moon","fa-sun");
    }
 }
// ==============events=========================
form.addEventListener("submit",function (e) {
    e.preventDefault();
    if(isValid==true){
        setForm()
        
    }
    
})
form.addEventListener("input",function(){
 if(validationName(inputs[0]) && validationName(inputs[1]) && validationEmail() && validationPassword() && validationAge()){
    isValid=true;
 }else{
    isValid= false;
 }
})


function setForm(){
   const user={
    first_name:inputs[0].value,
    last_name:inputs[1].value,
    email:inputs[2].value,
    password:inputs[3].value,
    age:inputs[4].value
   }
   console.log(user)
 localStorage.setItem('userInfo',JSON.stringify(user))
location.href='./index.html'
}



// =======validation======
function validationName(input){
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    if(regexStyle.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid"); 
        return false;
    }
};

function validationEmail(){
    const regexStyle =
     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexStyle.test(inputs[2].value)){
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");
        return true
    }else{
        inputs[2].classList.add("is-invalid");
        inputs[2].classList.remove("is-valid"); 
        return false;
    }
};

function validationPassword(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexStyle.test(inputs[3].value)){
        inputs[3].classList.add("is-valid");
        inputs[3].classList.remove("is-invalid");
        return true
    }else{
        inputs[3].classList.add("is-invalid");
        inputs[3].classList.remove("is-valid"); 
        return false;
    }
};
function validationAge(){
    const regexStyle = /^([1-7][0-9]|80)$/;
    if(regexStyle.test(inputs[4].value)){
        inputs[4].classList.add("is-valid");
        inputs[4].classList.remove("is-invalid");
        return true
    }else{
        inputs[4].classList.add("is-invalid");
        inputs[4].classList.remove("is-valid"); 
        return false;
    }
};
// ===========mode=========
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
