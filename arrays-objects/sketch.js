// Memory Card Game
// Elaine King
// 10/26/2025
//
// Extra for Experts:
// added background music(hopefully) and a few logic things but they dont reallllyyy count
// fisher yates algorithm to shuffle cards: https://www.tutorialspoint.com/data_structures_algorithms/dsa_fisher_yates_shuffle_algorithm.htm & some help from ai


//memory card game in progress huzzah.

// arrays to hold cards, flipped cards, images, and confetti
let cards = [];
let flipped = [];
let imgs = [];
let confetti = [];

// setting up variables for the game
let cardBack;
let boardDown = 4;
let boardAcross = 4;
let cardAmount = 8;
let allowedFlip = true; 
let gameState = "menu";
let flipTimer = 0;
let backgroundMusic;

const FLIP_DELAY = 1000; 

function preload() {
  // flipped pokemon images for cards
  for (let i = 1; i <= cardAmount; i++) {
    imgs.push(loadImage(`assets/pokemon-0${i}.png`)); // turns out you cant use "" while using ${i} so rip and this took me forever to find it you need backticks ``
  }
  
  // unflipped card image
  cardBack = loadImage("assets/cardback.png");
  // the background music
  backgroundMusic = loadSound("assets/pokemongamemusic.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnCards();
  createConfetti();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  arrangeBoard(); // re-arranges the board when window is resized
}

// draw loop that is nice and clean :D
function draw() {
  if (gameState === "menu") {
    startScreen();
  } 
  else if (gameState === "theGame") {
    displayCards();
    checkFlipTime();
    checkForWin();
  }
}

// making confetti
function createConfetti() {
  for (let i = 0; i < 80; i++) {
    confetti.push({
      x: random(width),
      y: random(-height, 0),
      size: random(5, 10),
      color: color(random(255), random(255), random(255)),
      speed: random(1, 8)
    });
  }
}

// spawning the confetti
function spawnConfetti() {
  background("darkblue");
  for (let c of confetti) {
    fill(c.color);
    noStroke();
    ellipse(c.x, c.y, c.size);
    c.y += c.speed;
    if (c.y > height) {
      c.y = random(-50, 0);
      c.x = random(width);
    }
  }
}

// the start screen that appears first
function startScreen() {
  background("darkblue");
  showButton();

}

// the start button
function showButton() {
  let buttonX = width / 2;
  let buttonY = height / 2;
  let w = 200;
  let h = 100;
  rectMode(CENTER);
  fill("red");
  rect(buttonX, buttonY, w, h, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Start Game", buttonX, buttonY);
}

// handling mouse presses for flipping cards and starting the game
function mousePressed() {
  if (gameState === "menu") {
    let buttonX = width / 2;
    let buttonY = height / 2;
    let w = 200;
    let h = 100;
    if (
      mouseX > buttonX - w/2 &&
      mouseX < buttonX + w/2 &&
      mouseY > buttonY - h/2 &&
      mouseY < buttonY + h/2
    ) {
      gameState = "theGame";
    }
    return;
  }

  if (!allowedFlip) {
    return;
  }

  for (let card of cards) {
   // if two cards are flipped, they cant flip other cards
    if (!card.flipped && !card.matched && isHovering(card)) {
      card.flipped = true;
      flipped.push(card);


      if (flipped.length === 2) {
        allowedFlip = false;
        checkForMatch();
      }

      break; // exit loop after flipping one card (sorry i didnt know how to do this any other way...)
    }
  }
  // play background music
    if (!backgroundMusic.isPlaying()){
      backgroundMusic.loop();
  }
}

// checks if its time to flip back the cards
function checkFlipTime() {
  if (flipTimer > 0 && millis() - flipTimer > FLIP_DELAY) {
    for (let c of flipped) {
      c.flipped = false;
    }
    flipped = [];
    flipTimer = 0;
    allowedFlip = true;
  }
}

// checks if the mouse is hovering over a card
function isHovering(card) {
  return  mouseX > card.x - card.w/2 &&
          mouseX < card.x + card.w/2 &&
          mouseY > card.y - card.h/2 &&
          mouseY < card.y + card.h/2;
}

// checks if the two flipped cards match
function checkForMatch() {
  // get the two flipped cards
  let first = flipped[0];
  let second = flipped[1];

  // if they match, keep them face up
  if (first.face === second.face) {
    first.matched = true;
    second.matched = true;
    flipped = [];       // reset the list of flipped cards
    allowedFlip = true;     // allow player to flip cards 
  } 
  else {
    // if they don't match this flips them back after the delay
    flipTimer = millis();
    allowedFlip = false;
  }
}

// spawning the cards on the board
function spawnCards() {
  // Shuffle the cards before spawning/displaying
  let pokemonCards = imgs.concat(imgs); // basically duplicates the images to make the pairs
  shuffleCards(pokemonCards);

  // create the card object array thingy
  let index = 0;
  for (let i = 0; i < boardDown; i++) {
    for (let j = 0; j < boardAcross; j++) {
      let card = {
        face: pokemonCards[index],
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        flipped: false,
        matched: false,
      };
      cards.push(card);
      index++;
    }
  }
  arrangeBoard(); // re-arranges the board when window is resized (i think..)
}

// arranging the board of cards
function arrangeBoard() {
  let boardWidth = width * 0.8;
  let boardHeight = height * 0.8;

  let cardW = min(boardWidth / boardAcross, boardHeight / boardDown) * 0.9;
  let cardH = cardW * 1.4;

  let startX = (width - cardW * boardAcross) / 2 + cardW / 2;
  let startY = (height - cardH * boardDown) / 2 + cardH / 2;

  let index = 0;
  for (let i = 0; i < boardAcross; i++) {
    for (let j = 0; j < boardDown; j++) {
      let card = cards[index];
      card.x = startX + i * cardW;
      card.y = startY + j * cardH;
      card.w = cardW;
      card.h = cardH;
      index++;
    }
  }
}

// displaying the cards on the board
function displayCards() {
  for (let card of cards) {
    imageMode(CENTER);
    if (card.flipped || card.matched) {
      image(card.face, card.x, card.y, card.w, card.h); // the pokemon/unflipped cards
    } 
    else {
      image(cardBack, card.x, card.y, card.w, card.h); // the flipped cards
    }
  }
}

// Shuffle the cards using Fisher-Yates algorithm !
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkForWin() {
  // checks if every card is matched
  let allMatched = cards.every(card => card.matched);

  if (allMatched) {
    spawnConfetti();
    // display the winning messages
    textAlign(CENTER, CENTER);
    textSize(50);
    fill("yellow");
    text("HUZZAH!!", width / 2, height / 2);

    // take away their flipping rights....
    allowedFlip = false;
  }
}

// CRASHES WHEN YOU PRESS SPACE! (flip voltorb card and explode the screen) ... i ran out of time for this but the dream was there.

