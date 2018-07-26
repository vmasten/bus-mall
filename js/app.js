'use strict';

//Used to store relevant data locally
function UserData() {
  this.name = [];
  this.votes = [];
  this.views = [];
}

var imgs = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.jpg', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var imgObjs = [];
var globalClicks = 0;

var container = document.getElementById('image_picker');
var resultsContainer = document.getElementById('results-list');
var results = document.getElementById('results');

var names = [];
var votes = [];

function ImageTracker(img) {
  this.name = img.split(/[/*.]/)[1]; //took me a while to figure out how to use regex
  this.path = img;
  this.votes = 0;
  this.views = 0;
}

//used by Chart.js
var data = {
  labels: names,
  datasets: [
    {
      label: '# of votes',
      data: votes,
      backgroundColor: '#2c2c2c',
    },
  ]
};

var buildTracker = function () {
  for(var i = 0; i < imgs.length; i++) {
    imgObjs.push(new ImageTracker(imgs[i]));
  }
};

var render = function(arr) {
  var returnArray = [];
  for (var i = 0; i < 3; i++) {
    var imgAppend = document.getElementById('image' + (i + 1)); //genuinely surprised this worked
    var imgEl = document.createElement('img');
    var randomImage = Math.floor(Math.random() * (arr.length));

    returnArray[i] = arr[randomImage].name;
    imgEl.src = arr[randomImage].path;
    imgEl.id = arr[randomImage].name;
    arr[randomImage].views++;
    imgAppend.insertBefore(imgEl, imgAppend.firstChild);
    arr.splice(randomImage, 1);

  }
  return returnArray;
};

//handles the initial display of images
var initDisplay = function() {
  var pickerArray = []; //objects are removed as they're displayed
  pickerArray = imgObjs.slice();
  var arr = render(pickerArray);
  return arr;
};

//after initDisplay, rerenders images
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

//clears the screen between image renders
var clearScreen = function() {
  document.getElementById('image1').firstChild.remove();
  document.getElementById('image2').firstChild.remove();
  document.getElementById('image3').firstChild.remove();
};

//an event handler that also displays the chart once all votes are in
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
  if (globalClicks > 24) {
    container.removeEventListener('click', voteHandler);
    container.style.display = 'none';
    results.style.display = 'block';
    storage();
    createChartArrays();
    drawChart();
  }
};

//stores/retrieves data to/from local storage
var storage = function() {
  if (localStorage.getItem('user data') === null) {
    var stringifiedData = storeData();
    localStorage.setItem('user data', JSON.stringify(stringifiedData));
  }
  else {
    var moreData = JSON.parse(localStorage.getItem('user data'));
    for (var i = 0; i < imgObjs.length; i++) {
      moreData.votes[i] += imgObjs[i].votes;
    }
    localStorage.setItem('user data', JSON.stringify(moreData));
  }
};

//forms data to be displayed by Chart.js using local storage
var createChartArrays = function() {
  var userData = JSON.parse(localStorage.getItem('user data'));
  for (var i = 0; i < userData.name.length; i++) {
    names[i] = userData.name[i];
    votes[i] = userData.votes[i];
  }
};

//forms data for local storage
var storeData = function() {
  var data = new UserData;
  for (var i = 0; i < imgObjs.length; i++) {
    data.name.push(imgObjs[i].name);
    data.votes.push(imgObjs[i].votes);
    data.views.push(imgObjs[i].views);
  }
  return data;
};

//uses Chart.js to draw a chart of how many times each image received votes
var drawChart = function() {
  var ctx = document.getElementById('results-list').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      legend: {
        labels: {
          responsive: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }
            ]}
        }
      }
    }
  });
};

buildTracker();
var controlArray = initDisplay();
container.addEventListener('click', voteHandler);