/* todo:: make water trail particle properly based on base radius / interactivity or event listeners

  2) create pooling depending on if grounds has collided with canvas border, make a bool array for it
*/

window.onload = () => config();
 
class Canvas {
  constructor(w, h, color) {
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
    let xRand = 4.5, yRand=4.5;
    switch (type) {
      case "fade-away-out":
        if(obj.away < 1) {
         MoveHandler.randomPlane(xRand,-yRand, obj.xAway, obj.yAway, obj);
        } else {
          MoveHandler.randomPlane(-xRand,-yRand, obj.xAway, obj.yAway, obj);
        }
        break;
      case "top-away":
        
        break;
      default:
        return "default display";
    }
  }
}

class RuleMaker {
  //only send arrays to rules
  static deleteOnCollissionY(obj1,obj2) {
    obj1.forEach(objF => {
     obj2.forEach(objS => {
      if(objF.y > objS.y) {
        let index = obj1.indexOf(objF);
        delete obj1[index];
       }
     });
    });
  }
  static deleteObj(obj, arr) {
    arr.forEach(object => {
       let index = arr.indexOf(object);
       tConsole.innerText = index
       delete arr[index];
     });
  }
  static createOnCollissionY(obj1,obj2,toCreate,toArray) {
    let fObject, sObject;
    obj1.forEach(objF => {
      fObject = objF;
      
      });
    obj2.forEach(objS => {
      sObject = objS;
    });
    if (fObject.y >= sObject.y) {
       toArray.push(toCreate)
    }
  }
}

class MiniDroplets extends Particles {
  constructor(x, y, r, color) {
    super(); // to set group and animation type later
    this.x = x;
    this.y = y;
    this.r = r;
    this.gravBool = false;
    this.animationOver = false;
    this.away = Math.random()*2;
    this.heightLimit = this.y/1.30;
    this.yAway = 2.5;
    this.xAway = 5.5;
    this.randRad = Math.random() * this.r / 1.5;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.randRad, 0, 360, false);
    ctx.fill();
  }
}

class GameElements {
  static droplets = [];
  static waters = [];
  static particles = {
    minidroplets: [],
    ph: 0
  };
  static grounds = [];
  static genRand = Math.random()*2;
  static randomize(multiplier) {
    GameElements.genRand = Math.random()*2.5;
  }
}

class Ground {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.stroke;
  }
}

class Physics extends GameElements {
  static g = 5;
  static oVel = 0.5;
  static vel = Physics.oVel;
  static state = ""
  static dropletsGravity() {
    GameElements.droplets.forEach((drops) => {
      Physics.vel += Physics.vel * 0.15;
      drops.y += Physics.g + Physics.vel;

      Physics.detectGroundCol(drops);
      if (Physics.state == "col") {
        Physics.breakUp(drops);
        Physics.state = "no-col";
        Physics.vel = Physics.oVel;
      }
    })
  }
  static generalGravity(obj,g, vel) {
    obj.y += g * vel;
  }
  static breakUp(obj) {
    for (let x = 0; x < Physics.vel / 6; x++) {
      let randRad = Math.random() * obj.r+1;
      GameElements.particles.minidroplets.push(new MiniDroplets(obj.x, obj.y, randRad, obj.color));
    }
    RuleMaker.deleteObj(obj, GameElements.droplets);
  }
  static detectGroundCol(obj) {
    GameElements.grounds.forEach((grounds) => {
      if (obj.y >= grounds.y) {
        obj.y = grounds.y;
        window.setTimeout(() => {
          Physics.state = "col";
        }, 1);
      }
    });

  }

}

class MoveHandler {
  static plane(x, y, obj) {
    obj.x += x;
    obj.y += y;
  }
  static tweenPlane(x,y,m,obj) {
    obj.x += x * m;
    obj.y += y * m;
  }
  static randomPlane(x,y,rX,rY,obj) {
    obj.x += x + (Math.random()*rX);
    obj.y += y + (Math.random()*rY)
  }
}

class Renderer {
  static renderAll() {
    GameElements.droplets.forEach((drops) => {
      RuleMaker.createOnCollissionY(GameElements.droplets,GameElements.grounds,new Ground(
        drops.x-10, drops.y, drops.r*2.5, drops.r, drops.color
        ),GameElements.waters);
      drops.render();
      
    });
    GameElements.grounds.forEach((grounds) => {
      grounds.render();
    });
    GameElements.waters.forEach((waters) => {
      waters.render();
    });
    GameElements.particles.minidroplets.forEach((minidroplets) => {
      minidroplets.render();
      
      function gravity() {
        Physics.generalGravity(minidroplets, minidroplets.yAway+Math.random()*2.5, 2.5);
        minidroplets.animationOver = true;
      }
      if(minidroplets.y <= minidroplets.heightLimit) {
        minidroplets.gravBool = true;
      }
      if(minidroplets.gravBool) {
        gravity();
      }
        Particles.animate("fade-away-out", minidroplets);
      
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
    ctx.moveTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 360, false);
    ctx.fill();
    ctx.beginPath();
    ctx.lineTo(this.x, this.y);
    ctx.moveTo(this.x - 8, this.y)
    ctx.lineTo(this.x, this.y - 20)
    ctx.lineTo(this.x + 8, this.y);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.arc(this.x, this.y + 5, this.r / 2, 0, 140, false);
    ctx.fill();
  }
}

class Controller {
  static enableClickToAdd() {
   window.addEventListener("click",(event)=> {
     GameElements.droplets.push(new Droplet(8, event.x,event.y, "blue"));
    });
  }
}

function config() {
  Controller.enableClickToAdd();
  GameElements.grounds.push(new Ground(0, canvas.dom.height / 1.15, canvas.dom.width, 1, "black"));
  animate();
} 
//GLOBAL
let canvas = new Canvas(window.innerWidth, window.innerHeight, "#ffffff"),
  ctx = canvas.ctx;


function main() {
  Physics.dropletsGravity();
  RuleMaker.deleteOnCollissionY(GameElements.particles.minidroplets, GameElements.grounds);
  Renderer.renderAll();
}

function animate() {
  canvas.clearAll();
  main();
  window.requestAnimationFrame(animate);
}