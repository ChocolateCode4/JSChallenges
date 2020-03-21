window.onload = () => init();

let navbar = document.querySelector("nav"), body = document.querySelector("body"),
  data1 = document.createElement("h2"),
  data2 = document.createElement("h2");
  data2.innerText = "Week 2: Bruuuh";
  data1.innerText = "Week 1: \n Bruh";
  data1.onclick = (event) => {
    window.location.href = ("week1/index.html");
  };
function init() {
  navbar.appendChild(data1);
  navbar.appendChild(data2);
  update();
}

function update() {
  window.requestAnimationFrame(update);
}