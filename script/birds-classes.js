import { birdsData } from "./birds-module.js";
class Bird {
  #image;
  static #count = 0;
  // <img src="" />
  constructor(src) {
    if (this.constructor.name == "Engine") {
      throw new Error("Engine is abstract class can't be instantiated");
    }
    let img = document.createElement("img");
    img.src = src;
    this.#image = img;
    this.#image.style.position = "absolute";
    this.#image.style.width = 200 + "px";
    this.#image.style.height = 100 + "px";
  }
  static get count() {
    return Bird.#count;
  }
  get image() {
    return this.#image;
  }
}
