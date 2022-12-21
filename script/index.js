import { birdsData } from "./birds-module.js";
const section = document.querySelectorAll("section")[1];
birdsData.map((element) => {
  let div = document.createElement("div");
  div.innerHTML = `<image width="50" height="50" src=${
    element.src
  } alt="bird" /><span style="color: ${
    element.color
  };font-size:40px;font-weight:900">${element.score > 0 ? "+" : ""}${
    element.score
  }  Points</span>`;
  div.classList.add("flex-center");
  section.append(div);
});
