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

// sounds
let backgroundMusic;
let splashingSound;
let quackSound;

// let draggingItem = false;
let draggingItem = "";
let dragType = "";
let isDragging = false;


function preload() {
  grassImg = loadImage("assets/clover.png");
  rockImg = loadImage("assets/rock.png");
  spriteImg = loadImage("assets/sprite.png");
  meatImg = loadImage("assets/ribeye.png");
  waterImg = loadImage("assets/water.png");
  toyImg = loadImage("assets/toy.png");

  // backgroundMusic = loadSound(""); // still need to find background music
  quackSound = loadSound("assets/duckquack.mp3");
  splashingSound = loadSound("assets/splash.mp3");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/1.5/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);
  //add player to grid
  grid[thePlayer.y][thePlayer.x] = SPRITE;
}

function draw() {
  background("gray");
  displayGrid();
  spawnMenu();
  doesSpriteEat();
  checkIfGrabbed();
}


// for now this will hold all of the things I want to eventually be able to drop in.
function spawnMenu() {
  const menuX = width - width * 0.22;
  const menuY = height / 3 - CELL_SIZE;
  const spacing = CELL_SIZE + 20;
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text('MENU', width - width*0.22, FONT_SIZE); // reminder for me to eventually make const for values

  image(waterImg, menuX, menuY, CELL_SIZE * 0.5, CELL_SIZE * 0.5);
  image(meatImg, menuX, menuY + spacing, CELL_SIZE * 0.5, CELL_SIZE * 0.5);
  image(toyImg, menuX, menuY + spacing * 2, CELL_SIZE * 0.5, CELL_SIZE * 0.5);
}

// if sprite eats, replace item with sprite & play sound 
function doesSpriteEat() {
  let tile = grid[thePlayer.y][thePlayer.x];
  if (tile === MEAT || 
      tile === WATER ||
      tile === TOY) {
    grid[thePlayer.y][thePlayer.x] = SPRITE;
    if (tile === WATER) splashingSound.play();
    if (tile === TOY) quackSound.play();
  }
}

function startDrag(item, img){
  dragType = item;
  draggingItem = img;
  isDragging = true;
}

function mousePressed() {
  const menuX = width - width * 0.22;
  const menuY = height / 3 - CELL_SIZE;
  const spacing = CELL_SIZE + 20;

  // check if mouse is inside column
  if (mouseX > menuX && mouseX < menuX + CELL_SIZE * 0.5) {
    // find which item was clicked
    let item = Math.floor((mouseY - menuY) / spacing);

    if (item === 0) startDrag(WATER, waterImg);
     else if (item === 1) startDrag(MEAT, meatImg);
      else if (item === 2) startDrag(TOY, toyImg);
  } 
}

function mouseReleased() {
  if (isDragging && draggingItem) {
    let x = Math.floor(mouseX / CELL_SIZE);
    let y = Math.floor(mouseY / CELL_SIZE);
    if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
      grid[y][x] = dragType;
    }
  }
  // stop dragging so reset
  isDragging = false;
  draggingItem = "";
  dragType = "";
}

function checkIfGrabbed() {  
  if (isDragging && draggingItem) {
    image(draggingItem, mouseX - CELL_SIZE/2, mouseY - CELL_SIZE/2, CELL_SIZE*0.5, CELL_SIZE*0.5);
  }
}


function keyPressed() {
  if (key === "w") {
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
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE ||
        grid[y][x] === MEAT ||
        grid[y][x] === WATER ||
        grid[y][x] === TOY){
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
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
    // so the grass doesnt disappear under other tiles
    image(grassImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      if (grid[y][x] === IMPASSIBLE)
        image(rockImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      if (grid[y][x] === SPRITE)
        image(spriteImg, x * CELL_SIZE + CELL_SIZE * (0.5 - spriteSize / 2), y * CELL_SIZE + CELL_SIZE * (0.5 - spriteSize / 2), CELL_SIZE * spriteSize, CELL_SIZE * spriteSize
        );
      if (grid[y][x] === MEAT)
        image(meatImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      if (grid[y][x] === WATER)
        image(waterImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      if (grid[y][x] === TOY)
        image(toyImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
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