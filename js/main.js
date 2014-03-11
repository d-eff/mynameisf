window.onload = function(){

  window.addEventListener('resize', resizeHead);
  resizeHead();

  var carouselRotator = setInterval(rotateCarousel, 5000);
  var h = window.innerHeight;

  window.addEventListener('focus', function(){
    if(!carouselRotator){
      carouselRotator = setInterval(rotateCarousel, 5000);
    }
  });

  window.addEventListener('blur', function(){
      window.clearInterval(carouselRotator);
      carouselText[carouselCount%3].innerHTML = "makes things on the internet.";
      carouselRotator = null;
  });

  window.addEventListener('scroll', function(){
    if(window.scrollY > h/2){
      crashMenu();
    } else {
      expandMenu();
    }
  })

  var works = document.getElementById('works');
  var xhr = new XMLHttpRequest();
  works.addEventListener('click', function(e){
    e.preventDefault();
    xhr.open("GET", "text.txt", true);
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = oncallback;
    xhr.send(null);
  });

  function oncallback(){
    var bc = document.getElementById("bodyContainer");
    if(xhr.readyState === 4) { 
      if(xhr.status === 200) {
        console.log(xhr.responseText);
        bc.innerHTML = xhr.responseText;
      }
    }
  }
}


function resizeHead(){
  var head = document.getElementsByClassName('introContainer')[0];
  head.style.height = window.innerHeight.toString() + "px";
}

function rotateCarousel(){
  var carousel = document.getElementById('carousel');
  var carouselText = document.getElementsByClassName('carouselText');

  carouselCount++;
  var degree = carouselCount*120;

  carousel.style.webkitTransform = "translateZ(24px) rotateX(-" + degree.toString() +"deg)";
  carouselText[(carouselCount+1)%3].innerHTML = aboutMe[Math.random()*aboutMe.length|0]; 
}

function crashMenu(){
  var x = document.getElementsByClassName('introBox')[0];
  var h = document.getElementsByClassName('introContainer')[0];
  x.classList.add('menuBox');
//  h.style.height = h.style.height === "72px" ? window.innerHeight.toString()+"px" : "72px";
}
function expandMenu(){
    var x = document.getElementsByClassName('introBox')[0];
    x.classList.remove('menuBox');
}

var carouselCount = 0;
var carouselText = document.getElementsByClassName('carouselText');

var aboutMe = [
"sez leave b4 u r expunged.",
"his mom thinks he's cool. (He's not.)",
"once drank champagne from a fishbowl.",
"played a wizard with 19 strength.",
"makes things on the internet.",
"drinks more coffee than is probably healthy.",
"saw a guy say goodbye to a shoe, once.",
"brother to the Pope of Chili Town.",
"really likes dry-erase boards.",
"non-GMO.",
"bathes daily.",
"Erd&#246;s number: infinity.",
"makes a mean cobbler."];
