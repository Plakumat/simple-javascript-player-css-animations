"use strict";

//animation order
var thumbnail = document.querySelector("[thumbnail]");
var playButton = document.querySelector("[play]");
var playOutline = document.querySelector("[play-outline]");
playButton.addEventListener("click", function () {
  //if there is no specification play it
  if (!thumbnail.classList.contains("pulse") && !thumbnail.classList.contains("rotate") && !thumbnail.classList.contains("animate-pause")) {
    //show outline
    playOutline.classList.add("active"); //detect unpulse class for transform

    if (thumbnail.classList.contains("unpulse")) {
      thumbnail.classList.remove("unpulse");
    } //add pulse to thumbnail


    thumbnail.classList.toggle("pulse"); //add rotate after pulse animation

    if (thumbnail.classList.contains("pulse")) {
      setTimeout(function () {
        thumbnail.classList.toggle("rotate");
      }, 300);
    } else {
      thumbnail.classList.remove("rotate");
      thumbnail.classList.add("unpulse");
    }
  } //click while if it's turning, add animation stop


  if (thumbnail.classList.contains("pulse") && thumbnail.classList.contains("rotate")) {
    thumbnail.classList.add("animate-pause");
  } //if its stopped, remove pause and continue to play


  if (thumbnail.classList.contains("pulse") && thumbnail.classList.contains("rotate") && thumbnail.classList.contains("animate-pause") && !playButton.classList.contains("playing")) {
    thumbnail.classList.remove("animate-pause");
  } //playbutton toggle switch


  playButton.classList.toggle("playing"); //player trigger

  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
}); //player

var timer;
var increment;
var percent = 0;
var audio = document.getElementById("audio"); //get player event

audio.addEventListener("playing", function (_event) {
  var duration = _event.target.duration;
  advance(duration, audio);
}); //get pause event

audio.addEventListener("pause", function (_event) {
  clearTimeout(timer);
  clearProperties();
}); //get duration, increment of songs and timer properties

var advance = function advance(duration, element) {
  var progress = document.getElementById("progress");
  increment = Math.round(100 / duration);
  percent = Math.round(increment * element.currentTime);
  progress.value = percent;
  startTimer(duration, element);
}; //timer trigger


var startTimer = function startTimer(duration, element) {
  if (percent < 100) {
    timer = setTimeout(function () {
      advance(duration, element);
    }, 100);
  }
}; //clear props


var clearProperties = function clearProperties() {
  playButton.classList.remove("playing");
  thumbnail.classList.add("animate-pause");
};