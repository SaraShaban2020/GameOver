const search= location.search; //return ?id=455
const params= new URLSearchParams(search);
let gameId=params.get('id');
let themeMode=document.getElementById("mode");
if(localStorage.getItem("theme") !=null){
   document.documentElement.setAttribute("data-theme","theme");
   if(themeMode.classList.contains("fa-sun")){
    themeMode.classList.replace("fa-sun","fa-moon");
   }else{
    themeMode.classList.replace("fa-moon","fa-sun");
   }
}

(async function(){
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,{
         method: 'GET',
       headers: {
         'X-RapidAPI-Key': '99606db4dbmsh4f9edf4a81b3009p1b1611jsn82759bf726cf',
         'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
       }
        })
        let data =await api.json();
      //   console.log(data);
        display(data)
})()

function display(gameDate){
    let game =`<div class="col-md-4">
    <figure>
       <img src="${gameDate.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb" class="text-light">
             i<li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${gameDate.title}</li>
          </ol>
       </nav>
 
       <h1>${gameDate.title}</h1>
 
       <h3>About ${gameDate.title}</h3>
       <p class="mb-2">${gameDate.description}</p>
      <hr>
      <h3>Additional Information</h3>
      <p class="text-muted border-bottom border-0 border-dark-subtle"">Please note this free-to-play game may or may not offer optional in-game purchases.</p>
      
      <div class="row">
        <div class="col-md-4 text-white-50">
       <h6>Title</h6>
       <p >${gameDate.title}</p>
        </div>
          <div class="col-md-4 text-white-50">
       <h6 >Developer</h6>
       <p>${gameDate.developer}</p>
        </div>
          <div class="col-md-4 text-white-50">
       <h6 >Publisher</h6>
       <p>${gameDate.publisher}</p>
        </div>
          <div class="col-md-4 text-white-50">
       <h6 >Release Date</h6>
       <p>${gameDate.release_date}</p>
        </div>
          <div class="col-md-4 text-white-50">
       <h6 >Genre</h6>
       <p>${gameDate.genre}</p>
        </div>
          <div class="col-md-4 text-white-50">
       <h6 >Platform</h6>
       <p>${gameDate.platform}</p>
        </div>
      </div>
      <hr>
      <h3>${gameDate.title} ScreenShots</h3>
      <div class="row">
        ${gameDate.screenshoots?gameDate.screenshoots.forEach((image)=>{
           `<div class="col-md-3">
             <img src=${image} class="w-100 rounded">
           </div>`
        }):''}
      </div>
       
    </div>
 </div>
 
    `;
 
    document.getElementById("detailsData").innerHTML = game ;
 
    const backgroundImage = gameDate.thumbnail.replace("thumbnail", "background");
 
    document.body.style.cssText = `
    background-image:url('${backgroundImage}') ;
    background-size:cover;
    background-position:center; `;
}
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