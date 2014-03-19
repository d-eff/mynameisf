window.onload = function(){
  var uri = location.pathname.split('/')[1].split('.')[0],
      paths = document.getElementsByClassName('content'),
      sectionIds = [];
  
  for(var x = 0; x < paths.length; ++x){
    sectionIds.push(paths[x].id);
  }
  
  if(uri){
    if(sectionIds.indexOf(uri) > -1){
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
}

function swapActiveContent(e){
  e.preventDefault();
  var newURI = e.target.getAttribute('href').replace(/#/, '');
  
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
