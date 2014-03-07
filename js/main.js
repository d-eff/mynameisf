window.onload = function(){

  window.addEventListener('resize', resizeHead);

  resizeHead();
}



function resizeHead(){
  var head = document.getElementsByClassName('introContainer')[0];
  head.style.height = window.innerHeight.toString() + "px";
}

var me = [
"sez leave b 4 u r expunged.",
"his mom thinks he's cool.",
"once drank champagne from a fishbowl.",
"once played a wizard with 16 strength.",
"makes things on the internet.",
"drinks more coffee than is probably healthy.",
"saw a guy say goodbye to a shoe, once.",
"brother to the Pope of Chili Town.",
"really likes dry-erase boards.",
""
  ];
