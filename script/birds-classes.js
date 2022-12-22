let birdsKilled = document.getElementById("birds");
let scoreDiv = document.getElementById("score");

export class Bird {
  static #count = 0;
  static #score = 0;
  constructor(src, birdScore, width, y) {
    let img = document.createElement("img");
    img.src = src;
    this.image = img;
    this.image.style.width = width + "px";
    this.image.style.position = "absolute";
    this.image.style.left = "-100px";
    this.image.style.top = y + "px";
    document.body.append(this.image);
    this.left = 0;
    this.top = y;
    this.birdScore = birdScore;
  }
  static get count() {
    return Bird.#count;
  }

  static get score() {
    return Bird.#score;
  }

  moveRight(value) {
    this.left += value;
    this.image.style.left = this.left + "px";
  }

  fall() {
    let down = setInterval(() => {
      if (this.top > window.innerHeight) {
        clearInterval(down);
        this.image.remove();
      }
      this.top += 10;

      this.image.style.top = this.top + "px";
    }, 10);
  }
  kill(obj) {
    document.getElementById("killAudio").play();
    obj.image.src = "images/dead.gif";
    obj.fall();
    Bird.#count++;
    Bird.#score += this.birdScore;
    birdsKilled.innerText = Bird.#count;
    scoreDiv.innerText = Bird.#score;
  }
}
