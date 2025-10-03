// Interactive Scene
// Elaine King
// 10/3/2025
// Extra for Experts:
// I learned how to use a class to make sure the planets all could 'orbit' around the center, I also experimented with frameRate to crate a slow motion effect

//https://www.youtube.com/watch?v=VaUZkzMW_2s explained classes
//https://www.youtube.com/watch?v=o9sgjuh-CBM for the translate/push/angle

// setting global variables
let gameState = "universe";
let planetImages = [];
let planets = [];
let milkyImg;
let sunImg;

// making sure the images are loaded before they are called
function preload() {
  // Load the background image for universe and the sun
  milkyImg = loadImage("milkyway.png");
  sunImg = loadImage('teletubbybabysun.png');
  // load planet images and push them into the planetImages array - push adds a new item to the end of an array
  planetImages.push(loadImage("mercury.png"));
  planetImages.push(loadImage("venus.png"));
  planetImages.push(loadImage("earth.png"));
  planetImages.push(loadImage("mars.png"));
  planetImages.push(loadImage("jupiter.png"));
  planetImages.push(loadImage("saturn.png"));
  planetImages.push(loadImage("uranus.png"));
  planetImages.push(loadImage("neptune.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // arguments for Planet - distance, angle, image, size, orbit speed
  planets.push(new Planet(50, 0, planetImages[0], 20, 0.01 * 4.787));
  planets.push(new Planet(75, 0, planetImages[1], 33, 0.01 * 3.502));
  planets.push(new Planet(110, 0, planetImages[2], 40, 0.01 * 2.978));
  planets.push(new Planet(145, 0, planetImages[3], 25, 0.01 * 2.408));
  planets.push(new Planet(200, 0, planetImages[4], 60, 0.01 * 1.307));
  planets.push(new Planet(280, 0, planetImages[5], 90, 0.01 * 0.969));
  planets.push(new Planet(350, 0, planetImages[6], 60, 0.01 * 0.681));
  planets.push(new Planet(420, 0, planetImages[7], 55, 0.01 * 0.543));
}

function draw() {
  if (gameState === "milkyway") {
    background(0);
    translate(width / 2, height / 2);
    // slo-mo effect when space is pressed
    if (keyIsDown(32)) {
      frameRate(10);
    } 
    else {
      frameRate(60);
    }
    // show planets and sun
    showSun();
    for (let planet of planets) {
      planet.draworbit();
      planet.orbit();
      planet.show();
    }
  
  }
  // Shows the milkyway image and background stars
  if (gameState === "universe") {
    background(milkyImg);
    backgroundStars();
    // If mouse pressed, switch game state back to "milkyway"
    if (mouseIsPressed === true) {
      gameState = "milkyway";
    }
  }
}
// draws a small cluster of stars in random positions
function backgroundStars() {
  frameRate(20);
  noStroke();
  // makes stars appear randomly
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 9; y++) {
      ellipse(random(windowWidth), random(windowHeight), 10);
    }
  }
}

//puts the sunImg in the center
function showSun() {
  imageMode(CENTER);
  image(sunImg, 0, 0, sunImg.width * 0.5, sunImg.height * 0.5);
}

class Planet {
  constructor(distance, angle, img, size, speed) {
    this.distance = distance;
    this.angle = angle;
    this.img = img;
    this.speed = speed;
    this.size = size;
  }
  // orbits the planet around center
  orbit() {
    this.angle += this.speed;
  }
  // Calculates x and y position from angle + distance
  show() {
    let x = this.distance * cos(this.angle);
    let y = this.distance * sin(this.angle);
    imageMode(CENTER);
    image(this.img, x, y, this.size, this.size);
  }
  // was trying to add orbit lines with planets
  draworbit() {
    stroke(255);
  }
}
