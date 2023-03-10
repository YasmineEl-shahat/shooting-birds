import { birdsData } from "./birds-module.js";
import { Bird } from "./birds-classes.js";

// variables
const name = location.search.split("&")[0].split("=")[1];
const level = location.search.split("&")[1].split("=")[1];
const speed = level == "level1" ? 50 : 30;
let seconds = 59;
let createBirdsInterval;
let bombCreate;
let birds = [];
let paused = false;

// selectors
document.getElementById("name").innerText = name;
document.getElementById("level").innerText = level;
let limit = document.getElementById("limit");
let result = document.getElementById("result");

// functions
let timer = setInterval(function () {
  seconds -= 1;
  limit.innerText = seconds;
  if (seconds == 0) {
    $("*").css("cursor", "");
    clearInterval(timer);
    clearInterval(createBirdsInterval);
    clearInterval(bombCreate);
    if (Bird.score >= 50) resultShow(true);
    else resultShow(false);
  }
}, 1000);

function killAll() {
  birds.forEach((bird) => {
    bird.kill(bird);
  });
  birds = [];
}

$(function () {
  document.getElementById("myAudio").play();
  $("*").css("cursor", "url(images/cursor.png),auto");
});

(function () {
  createBirdsInterval = setInterval(function () {
    if (!paused) {
      let bird = birdsData[Math.floor(Math.random() * 3)];
      let yPosition =
        Math.floor(Math.random() * window.innerHeight - 200) + 200;
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
            birdObject.image.remove();
          }
        }, speed);
      }, 100);
    }
  }, 100);

  // bomb creation
  bombCreate = setInterval(() => {
    let bomb = document.createElement("img");
    bomb.src = "images/bomb.png";
    bomb.style.position = "absolute";
    bomb.style.width = "200px";
    let x = Math.round(Math.random() * window.innerWidth - bomb.width);
    bomb.style.left = x + "px";
    document.body.append(bomb);
    let top = 0;
    let fall = setInterval(() => {
      if (top > window.innerHeight) {
        clearInterval(fall);
        bomb.remove();
      }
      top += 10;

      bomb.style.top = top + "px";
    }, 10);
    bomb.onclick = function () {
      document.getElementById("bombAudio").play();
      bomb.src = "images/fire.gif";
      paused = true;
      killAll();
      setTimeout(function () {
        bomb.remove();
        paused = false;
      }, 1000);
    };
  }, 5000);
})();

function resultShow(win) {
  if (win) {
    result.querySelector("h2").innerText = `You won
    score:${Bird.score}
    `;
  } else {
    result.querySelector("h2").innerText = "You lost";
  }
  result.querySelector("a").href = `game.html?name=${name}&level=${level}`;
  result.style.display = "flex";
}
