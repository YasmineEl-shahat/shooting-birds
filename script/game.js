const name = location.search.split("=")[1];
let seconds = 59;
document.getElementById("name").innerText = name;
let limit = document.getElementById("limit");

let timer = setInterval(function () {
  seconds -= 1;
  limit.innerText = seconds;
  if (seconds == 0) {
    clearInterval(timer);
  }
}, 1000);
