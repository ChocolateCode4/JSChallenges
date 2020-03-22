Window.onload = () => config();
const game = {
  state: "loading",
  objects: []
};

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
  constructor(text,x,y,w,h,color,colorT){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.textX = this.x;
    this.textY = this.y + this.h/1.15;
    this.textW = this.h;
    this.text = text;
    this.color = color;
    this.colorT = colorT;
  }
  render() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.stroke;
      ctx.fillStyle = this.colorT;
      ctx.font = this.textW + "px serif";
      ctx.fillText(this.text, this.textX, this.textY);
  }
  clicked() {
    console.log("clicked " + this.x +"/"+this.y);
  }
  align(position) {
    switch(position) {
      case "center":
        this.textX = this.w/2;
        break;
      default:
        return "Alignment is not possible";
    }
  }
}

let canvas = new Canvas(window.innerWidth, window.innerHeight),
    ctx = canvas.ctx;

function update() {
  canvas.clearAll();
  main();
  window.requestAnimationFrame(update);
}

function GUI(scene) {
  switch(scene) {
    case "display":
      let playButton = new TextBox("Play", 0, canvas.height/2, canvas.width, 50, "green", "black");
      game.state = "menu-start";
      playButton.align("center");
      game.objects.push(playButton);
    break;
    default:
      console.log("GUI Fail");
  }
}


function main() {
  render();
}

function config() {
  GUI("display");
  update();
}

function render () {
  game.objects.forEach((objs)=> {
    objs.render();
  });
}

function home() {
  window.location.href = "jschallenges/index.html";
}

config();