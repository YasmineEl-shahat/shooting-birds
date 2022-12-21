import { birdsData } from "./birds-module.js";
import { Bird } from "./birds-classes.js";

// variables
const name = location.search.split("=")[1];
let seconds = 59;
let createBirdsInterval;
let birds = [];
// selectors
document.getElementById("name").innerText = name;
let limit = document.getElementById("limit");

// functions
let timer = setInterval(function () {
  seconds -= 1;
  limit.innerText = seconds;
  if (seconds == 0) {
    clearInterval(timer);
    clearInterval(createBirdsInterval);
  }
}, 1000);

(function () {
  createBirdsInterval = setInterval(function () {
    let bird = birdsData[Math.floor(Math.random() * 3)];
    let yPosition = Math.floor(Math.random() * window.innerHeight - 200) + 200;
    let birdObject = new Bird(bird.src, bird.score, bird.width, yPosition);
    birds.push(birdObject);
    birdObject.image.onclick = function () {
      birdObject.kill(birdObject);
      birds.splice(birds.indexOf(birdObject), 1);
    };
    setTimeout(function () {
      let rightInterval = setInterval(() => {
        if (birdObject.left < window.innerWidth) {
          birdObject.moveRight(10);
        } else {
          clearInterval(rightInterval);
          birds.splice(birds.indexOf(birdObject), 1);
        }
      }, 10);
    }, 100);
  }, 100);
})();
