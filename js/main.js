window.onload = function(){

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

var linx = document.getElementsByClass('internal');
for(var x = 0; x < linx.length; ++x){
  (function(){
    linx[x].addEventListener('click', internalLink);
  })();
}

  var nav = document.getElementById('nav');
  var xhr = new XMLHttpRequest();
  var page = "";
    var bc = document.getElementById("bodyContainer");
  nav.addEventListener('click', function(e){
    e.preventDefault();
    var target = e.target.dataset.link;
    if(target !== page && window.scrollY > 0){
      page = target;

      xhr.open("GET", page+".html", true);
      xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
      xhr.onreadystatechange = oncallback;
      xhr.send(null);
    } else if (target !== page){
       
      page = target;
      xhr.open("GET", page+".html", true);
      xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
      xhr.onreadystatechange = oncallback2;
      xhr.send(null);
    } else if (target === page) {
      
    }
     
  });

  function oncallback(){
    var bc = document.getElementById("bodyContainer");
    if(xhr.readyState === 4) { 
      if(xhr.status === 200) {
        setTimeout(function(){
          bc.innerHTML = xhr.responseText;
        },200);
        
      }
    }
  }
  function oncallback2(){
    var bc = document.getElementById("bodyContainer");
    if(xhr.readyState === 4) { 
      if(xhr.status === 200) {
          bc.innerHTML = xhr.responseText;
        
      }
    }
  }
}


function resizeHead(){
  var head = document.getElementById('introContainer');
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

function internalLink(e){
  e.preventDefault();
  var newURI = e.target.href,
      oldPage = document.getElementsByClassName('active'),
      newP}age = document.getElementById(newURI);

  oldPage.classList.toggle('active');
  newPage.classList.toggle('active');
  
  location.href += newURI;

}


var carouselCount = 0;
var carouselText = document.getElementsByClassName('carouselText');

var aboutMe = [
"sez <a href=\"https://www.youtube.com/watch?v=bV-hSgL1R74\" target=\"_blank\">leave b4 u r expunged</a>.",
"his mom thinks he's cool. (He's not.)",
"once drank <a href=\"http://www.cookschampagne.com/CBICMS/cookschampagne/images/site/varieties/extra-dry_lg.jpg\" target=\"_blank\">champagne</a> from a fishbowl.",
"played a wizard with 19 strength.",
"drinks more coffee than is probably healthy.",
"saw <a href=\"http://simpsons.wikia.com/wiki/Hank_Scorpio\" target=\"_blank\">a guy</a> say goodbye to a shoe, once.",
"brother to the Pope of Chili Town.",
"really likes dry-erase boards.",
"non-GMO.",
"bathes daily.",
"<a href=\"http://www.oakland.edu/enp/\" target=\"_blank\">Erd&#246;s number</a>: infinity.",
"bakes a mean cobbler.",
"wears a lot of grey.",
"has been to Canada.",
"enjoys board games.",
"has a beard.",
"speaks really broken Spanish."];
