'use strict';

var imgs = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var imgObjs = [];
var globalClicks = 0;
var container = document.getElementById('image_picker');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

function ImageTracker(img) {
  this.name = img.split(/[/*.]/)[1]; //took me a while to figure out how to use regex
  this.path = img;
  this.votes = 0;
  this.views = 0;
}

var buildTracker = function () {
  for(var i = 0; i < imgs.length; i++) {
    imgObjs.push(new ImageTracker(imgs[i]));
  }
};
function rando() {
  return Math.floor(Math.random() * (imgObjs.length));
}

var render = function(arr) {
  var returnArray = [];
  for (var i = 0; i < 3; i++) {
    var imgAppend = document.getElementById('image' + (i + 1)); //genuinely surprised this worked
    var imgEl = document.createElement('img');
    var randomImage = Math.floor(Math.random() * (arr.length));
    returnArray[i] = arr[randomImage].name;
    imgEl.src = arr[randomImage].path;
    imgEl.id = arr[randomImage].name;
    imgAppend.insertBefore(imgEl, imgAppend.firstChild);
    arr.splice(randomImage, 1);
  }
  return returnArray;
};

var initDisplay = function() {

  var pickerArray = []; //objects are removed as they're displayed
  pickerArray = imgObjs.slice();
  var arr = render(pickerArray);
  return arr;
};

var afterDisplay = function(nameArray) {
  var pickerArray = []; //objects are removed as they're displayed
  var arr = []; //holds three elements to ensure no repeats
  pickerArray = imgObjs.slice();
  for (var i = 0; i < nameArray.length; i++) {
    for (var j = 0; j < pickerArray.length; j++) {
      if (nameArray[i] === pickerArray[j].name) {
        pickerArray.splice(j, 1);
      }
    }
  }
  arr = render(pickerArray);
  return arr;
};

var clearScreen = function() {
  document.getElementById('image1').firstChild.remove();
  document.getElementById('image2').firstChild.remove();
  document.getElementById('image3').firstChild.remove();
};

var voteHandler = function(event) {
  var vote = event.target.parentNode.parentNode.firstChild.id; //not exactly ideal, but it works
  for (var i = 0; i < imgObjs.length; i++) {
    if (imgObjs[i].name === vote) {
      imgObjs[i].votes++;
      globalClicks++;
      clearScreen();
      controlArray = afterDisplay(controlArray);
      break;
    }
}
  if (globalClicks > 25) {
    container.removeEventListener('click', voteHandler);
    console.log('stuff');
}
};

container.addEventListener('click', voteHandler);
//   voteHandler('button1');
// });

// button2.addEventListener('click', function() {
//   voteHandler('button2');
// });

// button3.addEventListener('click', function() {
//   voteHandler('button3');
// });

buildTracker();
var controlArray = initDisplay();

