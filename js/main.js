/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

(function(){ 
  "use strict";
window.onload = function () {
  //if we're on mobile, let's drop all the bs
  if (window.matchMedia('screen and (min-width:600px)').matches) {

    //janked-up router. todo: scrap this
    var uri = location.pathname.split('/')[1].split('.')[0],
        paths = document.querySelectorAll('.content'),
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
    var links = document.querySelectorAll('.jumplink');
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
  var oldPages = document.querySelectorAll('.active'),
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

  carouselCount++;
  var degree = carouselCount*120;

  carousel.style.webkitTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.mozTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.msTransform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";
  carousel.style.transform = "translateZ(20px) rotateX(-" + degree.toString() +"deg)";

  carouselText[(carouselCount+1)%3].innerHTML = aboutMe[Math.floor(Math.random()*aboutMe.length)]; 
}

var carouselCount = 0;
var carouselText = document.querySelectorAll('.carouselText');

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
