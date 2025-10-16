// Memory Card Game
// Elaine King
// 10/26/2025
//
// Extra for Experts:
// - 


//memory card game in progress huzzah.


let theCards = [];
let gameState = "begin";

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  if (gameState === "begin") {
    startScreen();
  }
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