// Walker OOP

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 3;
    this.radius = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

// let ro = new Walker(200, 300, 'green');
// let noor = new Walker(400, 500, 'red');
let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(220);
  // ro.move();
  // noor.move();
  // ro.display();
  // noor.display();
  for (let myWalker of theWalkers) {
    myWalker.move();
    myWalker.display();
  }
}

function mousePressed() {
  spawnWalker(mouseX, mouseY);
}

function spawnWalker(x, y) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColor = color(r, g, b);
  let someWalker = new Walker(x, y, someColor);
  theWalkers.push(someWalker);
}