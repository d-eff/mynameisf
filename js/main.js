
window.onload = function(){
  var uri = location.pathname.split('/')[1].split('.')[0],
      paths = document.getElementsByClassName('content'),
      sectionIds = [];

  for(var x = 0; x < paths.length; ++x){
    sectionIds.push(paths[x].id);
  }

  if(uri) {
    if(sectionIds.indexOf(uri) > -1) {
     activateSpecificSection(uri);
    } else {
      activateSpecificSection("404");
    }
  }

  var links = document.getElementsByClassName('jumplink');

  for(var x = 0; x < links.length; ++x){
  (function(){
   links[x].addEventListener('click', swapActiveContent);
       })();
  }
  
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


  //snaaaaaaaakes
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;;

  
  snakes.push(new snake(1, Math.random()*canvas.height + 10|0));
  var lastSnakeTime = new Date().getTime();

  setInterval(function(){  
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var x = 0; x < snakes.length; x++){
      snakes[x].update();
      if(!snakes[x].alive){
        snakes.splice(x,1);
      }
    }
    
    var curTime = new Date().getTime();
    if(snakes.length < 10 && curTime - lastSnakeTime > 5000){ 
      console.log("pushing snake")
      snakes.push(new snake(1, Math.random()*canvas.height + 10|0));
      lastSnakeTime = new Date().getTime();
    }

  }, 25);
}

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

  carousel.style.webkitTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.mozTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.msTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.transform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";

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
"speaks really broken Spanish.",
"abyssmally poor sculptor.",
"JACKPOT.",
"chicken wing connoisseur.",
"carbon-based lifeform.",
"<a href=\"http://www.imdb.com/title/tt0253556/quotes\" target=\"_blank\">keep both eyes on the sky.</a>"];

var snakes = [];
var snake = function(x, y){
  this.startx = this.xpos = x || 0,
  this.starty = this.ypos = y || 0,
  this.xspeed = 0.5,
  this.yspeed = 0,
  this.angle = 0,
  this.curSteps = 0,
  this.changeRate = 300,
  this.inflectionPoints = [{x:this.startx, y:this.starty}];
  this.alive = true;
}

snake.prototype.changeDirection = function(){
  var range = 45;
  // +- range
  var newAngle = this.angle + (Math.random() * (2*range+1) | 0) - range;
  this.angle = newAngle >= 0 ? Math.min(newAngle, 45) : Math.max(newAngle, -45);
  this.yspeed = this.xspeed * Math.tan(this.angle * Math.PI/180);
}

snake.prototype.move = function(){
  this.xpos += this.xspeed;
  this.ypos += this.yspeed;
}

snake.prototype.checkCollisions = function(){
  if(this.xpos > canvas.width || this.xpos < 0){
    this.xspeed = this.xspeed * -1;
    this.inflectionPoints.push({x:this.xpos, y:this.ypos});
    this.alive = false;
  }
  if(this.ypos > canvas.height || this.ypos < 0){
    this.yspeed = this.yspeed * -1; 
    this.inflectionPoints.push({x:this.xpos, y:this.ypos});
    this.alive = false;
  }
}

snake.prototype.draw = function(){
  var points = this.inflectionPoints;
      start = points[0];
  
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#edeac7';

  ctx.beginPath()
  ctx.moveTo(start.x, start.y);
  for(var n = 1; n < points.length; n++){
    ctx.lineTo(points[n].x, points[n].y);
  }
  ctx.lineTo(this.xpos, this.ypos);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.xpos, this.ypos, 10, 0, 2*Math.PI, false);
  ctx.fillStyle = '#fafafa';
  ctx.fill();
  ctx.stroke();
}

snake.prototype.update = function(){
  if(this.alive){
    if(this.curSteps >= this.changeRate){
      this.inflectionPoints.push({x:this.xpos, y:this.ypos});
      this.changeDirection();
      this.curSteps = 0;
    }
    this.move()
    this.checkCollisions()
    this.draw()
    this.curSteps++;
  }
}

