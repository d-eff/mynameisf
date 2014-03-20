window.onload = function(){

  //del

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

}

function swapActiveContent(e){
  e.preventDefault();
  var newURI = e.target.getAttribute('href').replace(/#/, '');
  
  console.log("activating " + newURI);
  activateSpecificSection(newURI);

  var stateObj = { foo: "bar" }; 
  history.pushState(stateObj, newURI, newURI+".html");
}

function activateSpecificSection(sectionName){
  var oldPage = document.getElementsByClassName('active')[0],
      newPage = document.getElementById(sectionName);

  if(oldPage){
    oldPage.classList.toggle('active');
  }

  if(newPage){
    newPage.classList.toggle('active');
  }
}

function rotateCarousel(){
  var carousel = document.getElementById('carousel');
  var carouselText = document.getElementsByClassName('carouselText');

  carouselCount++;
  var degree = carouselCount*120;

  carousel.style.webkitTransform = "translateZ(24px) rotateX(-" + degree.toString() +"deg)";
  carouselText[(carouselCount+1)%3].innerHTML = aboutMe[Math.random()*aboutMe.length|0]; 
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
