// =====================
let links =document.querySelectorAll(".menue a");
let aPiLoading=document.getElementById("loader");
let themeMode=document.getElementById("mode")
getGames("MMorpg")
if(localStorage.getItem("theme") !=null){
  document.documentElement.setAttribute("data-theme","theme");
  if(themeMode.classList.contains("fa-sun"))
    themeMode.classList.replace("fa-sun","fa-moon")
}else{
  themeMode.classList.replace("fa-moon","fa-sun")
}
// =======events========
links.forEach(function(link){
   link.addEventListener("click",function(){
    document.querySelector('.menue .active').classList.remove("active");
    link.classList.add("active")
    // console.log(link.dataset.category) special to  custome attrepute
     let category =link.getAttribute("data-category");
     getGames(category)
   })
})
themeMode.addEventListener("click",function(){
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
// =====================function============
async function getGames(category){
  aPiLoading.classList.remove("d-none")
      let data =await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,{
         method:"GET",
         headers:{
            'X-RapidAPI-Key': '99606db4dbmsh4f9edf4a81b3009p1b1611jsn82759bf726cf',
		      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
         }
      });
      let response =await data.json();
      // console.log(response)
      displayGames(response);
      aPiLoading.classList.add("d-none")

    
}
function displayGames(gameData) {
  let gameCard=``;
  for (let i = 0; i < gameData.length; i++) {
    let videoPath = gameData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
    gameCard += `<div class="col-lg-4 col-md-3 col-12 ">
    <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gameData[i].id})" class="card h-100 bg-transparent" role="button" >
    <div class="card-body">

       <figure class="position-relative">
          <img class="card-img-top object-fit-cover h-100" src="${gameData[i].thumbnail}" />

        <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
         <source src="${videoPath}">
         </video>

       </figure>

       <figcaption>

          <div class="d-flex justify-content-between">
             <h3 class="h6 small"> ${gameData[i].title} </h3>
             <span class="badge bg-primary p-2">Free</span>
          </div>

          <p class="card-text small text-center opacity-50">
             ${gameData[i].short_description}
          </p>

       </figcaption>
    </div>

    <footer class="card-footer small d-flex justify-content-between">

       <span class="badge badge-color">${gameData[i].genre}</span>
       <span class="badge badge-color">${gameData[i].platform}</span>

    </footer>
 </div>
</div>`
    
  }
document.getElementById("games").innerHTML=gameCard;
}
function startVideo(event) {
  const videoEl = event.target.querySelector("video"); // card ---> video
  videoEl.classList.remove("d-none");
  videoEl.muted = true;
  videoEl.play();
}

function stopVideo(event) {
  const videoEl = event.target.querySelector("video");
  videoEl.classList.add("d-none");
  videoEl.muted = true;
  videoEl.pause();
}
function showDetails(id){
    location.href =`detail.html?id=${id}`;
    
}

  


