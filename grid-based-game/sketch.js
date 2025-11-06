// Project Title
// Elaine King
// 10/30/2025
//
// Extra for Experts:
// - 

// REPLACE PLAYER WITH SPRITE

const CELL_SIZE = 100;
const FONT_SIZE = 75;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const POTION = 2;
// const notsureyet = 3;
const CARROT = 4;
const TOY = 5;
const WATER = 6;
const MEAT = 7;
const SPRITE = 9;

let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};
let spriteSize = 0.4;

// imgs
let grassImg;
let rockImg;
let spriteImg;
let meatImg;
let waterImg;
let toyImg;
let carrotImg;
let potionImg;

// sounds
let backgroundMusic;
let splashingSound;
let quackSound;

// drag & drop variables
let button = false;
let w = 100;
let h = 75;

function preload() {
  grassImg = loadImage("assets/clover.png");
  rockImg = loadImage("assets/rock.png");
  spriteImg = loadImage("assets/sprite.png");
  meatImg = loadImage("assets/ribeye.png");
  waterImg = loadImage("assets/water.png");
  toyImg = loadImage("assets/toy.png");
  carrotImg = loadImage("assets/carrot.png");
  potionImg = loadImage("assets/potion.png");

  // backgroundMusic = loadSound(""); // still need to find background music
  quackSound = loadSound("assets/duckquack.mp3");
  splashingSound = loadSound("assets/splash.mp3");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/1.5/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);
  spawnMenu();
  //add player to grid
  grid[thePlayer.y][thePlayer.x] = SPRITE;
  grid[5][6] = MEAT;
}

function draw() {
  background("gray");
  displayGrid();
  spawnMenu();
}

// for now this will hold all of the things I want to eventually be able to drop in.
function spawnMenu() {
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text('MENU', width - width*0.22, FONT_SIZE); // reminder for me to eventually make const for values

  image(meatImg, width-width*0.22, height/2, CELL_SIZE*0.5, CELL_SIZE*0.5);

}



function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x ,y);

  // if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
  //   button = !button;
  // }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

// function checkIfGrabbed() {  
//   if (button) {
//     x = mouseX - w/2;
//     y = mouseY - h/2;
//   }
//   image(meatImg, x, y, CELL_SIZE, CELL_SIZE);
// }

// if sprite eats
function doesSpriteEat() {
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = SPRITE;
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = SPRITE;
  }
  else if (key === "w") {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "s") {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === "d") {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  else if (key === "a") {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
    //previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //moving the player location
    thePlayer.x = x;
    thePlayer.y = y;
  
    //put player on grid
    grid[thePlayer.y][thePlayer.x] = SPRITE;
  
    //reset old spot to be open tile
    grid[oldY][oldX] = OPEN_TILE;
  }
}



function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        image(grassImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === IMPASSIBLE) {
        image(rockImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === SPRITE) {
        image(grassImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        // fill("red");
        // noStroke();
        image(spriteImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE * spriteSize, CELL_SIZE * spriteSize);
      }
      else if (grid[y][x] === MEAT) {
        image(meatImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === WATER) {
        image(waterImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === POTION) {
        image(potionImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === carrotImg) {
        image(carrotImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSIBLE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}