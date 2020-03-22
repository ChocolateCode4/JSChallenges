// todo:: make water trail particle properly based on base radius / interactivity or event listeners

window.onload = () => config();

class Canvas {
  constructor(w,h,color) {
    this.dom = document.querySelector("canvas");
    this.ctx = this.dom.getContext("2d");
    this.dom.width = w;
    this.dom.height = h;
    this.color = color;
  }
  clearAll() {
    this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.dom.width, this.dom.height);
  }
}

let tConsole = document.querySelector("#console");

class Particles {
  constructor(anim, group) {
    this.animation = anim;
    this.group = group;
  }
  static animate(type, obj) {
    switch(type) {
      case "fade-away-out":
        let hlimit = obj.r*2;
      
      break;
      default:
        "default display";
    }
  }
}

class MiniDroplets extends Particles {
  constructor(x,y,r,color) {
    super(); // to set group and animation type later
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(Math.random()*this.x, this.y,this.r,0,360,false);
    ctx.fill();
  }
}

class GameElements {
  static droplets = [];
  static particles = {
    minidroplets: [],
    ph: 0
  };
  static grounds = [];
}

class Ground {
  constructor(x,y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.w,this.h);
    ctx.stroke;
  }
}

class Physics extends GameElements {
  static g = 5;
  static vel = 0.5;;
  static state = ""
  static gravity () {
    GameElements.droplets.forEach((drops)=> {
      Physics.vel += Physics.vel*0.15;
      drops.y += Physics.g + Physics.vel;
      
      Physics.detectGroundCol(drops);
      if(Physics.state == "col") {
        Physics.breakUp(drops);
      }
    })
  }
  static breakUp(obj) {
    
    //tConsole.innerText = Physics.vel /6;
    for(let x=0;x<Physics.vel/6;x++) {
      let randRad = Math.random() * obj.r;
      GameElements.particles.minidroplets.push(new MiniDroplets(obj.x, obj.y, randRad, obj.color));
      
    }
    GameElements.droplets.pop();
    
  }
  static detectGroundCol(obj) {
    GameElements.grounds.forEach((grounds)=> {
      if(obj.y >= grounds.y) {
        obj.y = grounds.y;
        window.setTimeout(()=>{
          Physics.state = "col";
        },1);
      }
    });
    
  }
  
}

class Renderer {
  static renderAll() {
    GameElements.droplets.forEach((drops)=> {
      drops.render();
    });
    GameElements.grounds.forEach((grounds)=> {
      grounds.render();
    });
    GameElements.particles.minidroplets.forEach((minidroplets)=> {
      minidroplets.render();
      Particles.animate("fade-away-out",minidroplets);
    });
  }
}

class Pool {
  constructor() {
    this.pooling = [];
  }
  static checkBoundaries() {
    
  }
}

class Droplet {
  constructor(r, x, y, color) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.r, 0, 360, false);
    ctx.fill();
    ctx.beginPath();
    ctx.lineTo(this.x,this.y);
    ctx.moveTo(this.x-8,this.y)
    ctx.lineTo(this.x,this.y-20)
    ctx.lineTo(this.x+8,this.y);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.arc(this.x,this.y+5,this.r/2,0,140,false);
    ctx.fill();
  }
}

function config() {
  animate();
}

//GLOBAL
let canvas = new Canvas(window.innerWidth, window.innerHeight, "#ffffff"),
ctx = canvas.ctx,
droplet = new Droplet(8,window.innerWidth/2,80, "blue"),
clearGround = new Ground(0, canvas.dom.height/1.15, canvas.dom.width,1,"black"); 

GameElements.grounds.push(clearGround);
GameElements.droplets.push(droplet);


function main() {
  Physics.gravity();
  Renderer.renderAll();
}

function animate () {
  canvas.clearAll();
  main();
  window.requestAnimationFrame(animate);
}