Window.onload = () => config();

class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.color = "#ffffff";
    this.dom = document.querySelector("canvas");
    //this.ctx = this.dom.getContext('2d');
    this.dom.height = height;
    this.dom.width = width;
    this.ctx = this.dom.getContext('2d');
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0,0, this.dom.width, this.dom.height);
  }
  
  clearAll() {
    this.ctx.clearRect(0,0,this.dom.width, this.dom.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.dom.width, this.dom.height);
  }
}

class TextBox {
  constructor(text,x,y,w,h,color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
    ctx.stroke;
  }
}

let canvas = new Canvas(window.innerWidth, window.innerHeight),
    ctx = canvas.ctx;

function update() {
  window.requestAnimationFrame(update);
  canvas.clearAll();
  main();
}

function GUI(scene) {
  switch(scene) {
    case "display":
      
    break;
    default:
      console.log("GUI Fail");
  }
}

let x = 1, vx = 25;

function main() {
  let squareTest = new TextBox("",x,100,100,100,"green")
  x+=vx
  if(x + squareTest.w/2 > canvas.dom.width || x < 0) {
    vx = -(vx)
  }
}

function home() {
  window.location.href = "jschallenges/index.html";
}

update();