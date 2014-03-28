(function(){ 
  "use strict";
window.onload = function () {
  //if we're on mobile, let's drop all the bs
  if (window.matchMedia('screen and (min-width:600px)')) {

    //janked-up router. todo: scrap this
    var uri = location.pathname.split('/')[1].split('.')[0],
        paths = document.getElementsByClassName('content'),
        sectionIds = [];

    for (var x = 0; x < paths.length; ++x) {
      sectionIds.push(paths[x].id);
    }
    //haaaaack
    sectionIds.push('blog');

    //basically, we grab all the content blocks,
    //then when a url comes in we peel off anything after those hostname.
    //if that matches the name of one of the blocks, we show the block.
    //otherwise we show the 404 block.
    //simple. 'naive' would also be an acceptable descriptor.
    if (uri) {
      if (sectionIds.indexOf(uri) > -1) {
       activateSpecificSection(uri);
      } else {
        activateSpecificSection("four04");
      }
    }

    //event listeners for internal links
    var links = document.getElementsByClassName('jumplink');
    for (var y = 0; y < links.length; ++y) {
     links[y].addEventListener('click', swapActiveContent);
    }
    
    //this operates the header carousel
    //if we lose focus, we switch to the default message
    //otherwise you get this awesome casino effect when you come back
    var carouselRotator = setInterval(rotateCarousel, 5000);
    window.addEventListener('focus', function () {
      if (!carouselRotator) {
        carouselRotator = setInterval(rotateCarousel, 5000);
      }
    });
    window.addEventListener('blur', function () {
        window.clearInterval(carouselRotator);
        carouselText[carouselCount%3].innerHTML = "makes things on the internet.";
        carouselRotator = null;
    });

    //about me easter egg
    var headshot = document.getElementById('headshot'),
        caption = document.getElementById('newPic'),
        headshotCount = 0;

    caption.addEventListener('click', function(){
      headshot.src = "imgs/headshot" + (++headshotCount%4) + ".png";
    });



    //snaaaaaaaakes
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

    setTimeout(function(){
      snakes.push(new Snake(1, Math.floor(Math.random()*canvas.height + 10)));
      var lastSnakeTime = new Date().getTime();

      setInterval(function () {  
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (var x = 0; x < snakes.length; x++) {
          snakes[x].update();
          if (!snakes[x].alive) {
            snakes.splice(x,1);
          }
        }
        
        var curTime = new Date().getTime();
        if (snakes.length < 5 && curTime - lastSnakeTime > 7000) { 
          snakes.push(new Snake(1, Math.floor(Math.random()*canvas.height + 10)));
          lastSnakeTime = new Date().getTime();
        }
      }, 20);
    }, 2000);
  }

  var email = document.getElementById("email");
  email.href = email.href.replace(/norobots/,'');
  email.innerHTML = email.innerHTML.replace(/norobots/,'');
};

function swapActiveContent(e){
  e.preventDefault();
  var newURI = e.target.getAttribute('href').replace(/#/, '');
  
  activateSpecificSection(newURI);

  var stateObj = { page: newURI }; 
  history.pushState(stateObj, "myNameIsF"+newURI, newURI+".html");
}

var canvas,
    ctx;

function activateSpecificSection(sectionName){
  var oldPages = document.getElementsByClassName('active'),
      newPage = document.getElementById(sectionName);

  for(var itm = oldPages.length-1; itm >= 0; --itm){ 
    oldPages[itm].classList.remove('active');
  }

  if(newPage){
    newPage.classList.toggle('active');

    var numKids = newPage.children.length;
    if(numKids > 0){
      var kids = newPage.children;
      for(var sec = numKids-1; sec >= 0; --sec){
        if(kids[sec].classList.contains('content')){
          kids[sec].classList.toggle('active');
        }
      }
    }
  }
}

function rotateCarousel(){
  var carousel = document.getElementById('carousel');
  var carouselText = document.getElementsByClassName('carouselText');

  carouselCount++;
  var degree = carouselCount*120;

  carousel.style.webkitTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.mozTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.msTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.transform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";

  carouselText[(carouselCount+1)%3].innerHTML = aboutMe[Math.floor(Math.random()*aboutMe.length)]; 
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
"speaks really broken Spanish.",
"abyssmally poor sculptor.",
"JACKPOT.",
"chicken wing connoisseur.",
"carbon-based lifeform.",
"<a href=\"http://www.imdb.com/title/tt0253556/quotes\" target=\"_blank\">keep both eyes on the sky.</a>"];

var snakes = [];
var Snake = function(x, y){
  this.startx = this.xpos = x || 0;
  this.starty = this.ypos = y || 0;
  this.xspeed = 0.5;
  this.yspeed = 0;
  this.angle = 0;
  this.curSteps = 0;
  this.changeRate = 300;
  this.inflectionPoints = [{x:this.startx, y:this.starty}];
  this.alive = true;
};

Snake.prototype.changeDirection = function(){
  var range = 45;
  // +- range
  var newAngle = this.angle + Math.floor(Math.random() * (2*range+1)) - range;
  this.angle = newAngle >= 0 ? Math.min(newAngle, 45) : Math.max(newAngle, -45);
  this.yspeed = this.xspeed * Math.tan(this.angle * Math.PI/180);
};

Snake.prototype.move = function(){
  this.xpos += this.xspeed;
  this.ypos += this.yspeed;
};

Snake.prototype.checkCollisions = function(){
  if(this.xpos > canvas.width || this.xpos < 0){
    this.xspeed = this.xspeed * -1;
    this.inflectionPoints.push({x:this.xpos, y:this.ypos});
    this.alive = false;
  }
  if(this.ypos > canvas.height || this.ypos < 0){
    this.yspeed = this.yspeed * -1; 
    this.inflectionPoints.push({x:this.xpos, y:this.ypos});
  }
};

Snake.prototype.draw = function(){
  var points = this.inflectionPoints,
      start = points[0];
  
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#eeeedf';

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  for(var n = 1; n < points.length; n++){
    ctx.lineTo(points[n].x, points[n].y);
  }
  ctx.lineTo(this.xpos, this.ypos);
  
  ctx.arc(this.xpos, this.ypos, 5, 0, 2*Math.PI, false);
  ctx.stroke();
};

Snake.prototype.update = function(){
  if(this.alive){
    if(this.curSteps >= this.changeRate){
      this.inflectionPoints.push({x:this.xpos, y:this.ypos});
      this.changeDirection();
      this.curSteps = 0;
    }
    this.move();
    this.checkCollisions();
    this.draw();
    this.curSteps++;
  }
};

})();
