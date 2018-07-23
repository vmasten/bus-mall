'use strict';

var imgs = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var imgObjs = [];

function ImageTracker(img) {
  this.name = img.split(/[/*.]/)[1];//took me a while to figure out how to use regex
  this.path = img;
  this.totalClicks = 0;
}

for(var i = 0; i < imgs.length; i++) {
  imgObjs.push(new ImageTracker(imgs[i]));
}

var displayImage = document.getElementById('image_picker');
for (var j = 0; j < 3; i++) {
  var imgEl = document.createElement('img');
  var pickerArray = [];
  pickerArray = imgObjs;
  var randomImage = Math.floor(Math.random() * (pickerArray.length));
  imgEl.src = pickerArray[randomImage].path;
  pickerArray.remove(randomImage);
  displayImage.appendChild(imgEl);
}
