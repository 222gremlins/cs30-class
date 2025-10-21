// Memory Card Game
// Elaine King
// 10/26/2025
//
// Extra for Experts:
// - 


//memory card game in progress huzzah.

let theMessages = [];
let theCards = [];
let finishedSet = [];
let theBoard = [];
let gameState = "begin";

function preload() {
  img1 = loadImage("pikachu.png");
  img2 = loadImage("mew.png");
  img3 = loadImage("voltorb.png");
  img4 = loadImage("zapdos.png");
  img5 = loadImage("eevee.png");
  img6 = loadImage("meowth.png");
  img7 = loadImage("gengar.png");
  img8 = loadImage("diglet.png");
  img9 = loadImage("charizard.png");
  img10 = loadImage("alakazam.png");

  img11 = loadImage("cardback.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  if (gameState === "begin") {
    startScreen();
  } 
  if (gameState === "theGame") {
    loadBackground();
    shuffleCards();
    spawnCards(); // this or I push the cards up to a board?
    
  }
}

//'Confetti' in the background of start screen
function confetti() {
  
  
}

// The start screen that appears first
function startScreen() {
  background("darkblue");

  showButton();
  
  
}

function showButton() {
  let rectX = windowWidth/2;
  let rectY = windowHeight/2;
  let w = 200;
  let h = 100;
  rect(rectX, rectY, w, h);

}

function anyText() {
  let _time = random(1000);
  let _buffer = random(1000);

  let message = {
    x: noise(_time) * width,
    y: noise(_time + _buffer) * height,
    diameter: random(20, 50),
    deltaTime: 0.01,
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theMessages.push(message);
}

//When you press the start button, it brings you to the game.
function mousePressed() {


  if (gameState === "start") {
    if (mouseX >= rectX && 
        mouseX <= rectX + w &&
        mouseY >= rectY && 
        mouseY <= rectY + h) {
      gameState = "theGame";
    }
  }
}

function shuffleCards() {
  
};

// function spawnCards() {
//   let theCard = {
//     x: ,
//     y: ,
//     img: ,
//     cardType: ,

//   };
// }

//gamestate begin - screen with a button to start playing, occurs at beginning; will also occur when user restarts by pressing a key
//gamestate playing - screen with the cards, timer in the corner?
