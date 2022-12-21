// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let heliImg = document.createElement("img");

heliImg.src = "img/heliGreenTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let state = "start";
let mouseIsPressed = false;
let heli;
let wall1, wall2, wall3;
let speedUpActive = false;
let wallSpeed = -5;
let distanceTravelled = 0;
let bestDistance = 0;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame()
    if (!speedUpActive) {
    speedUpActive = true
    setInterval(function() {
        if (wallSpeed > -10) {
        wallSpeed -= 0.4
        }
      }, 2000)
    } 
    distanceTravelled++;
  } else if (state === "gameover") {
    if (distanceTravelled > bestDistance) {
      bestDistance = distanceTravelled;
    }
    drawGameOver();
  }

  
  // Request Animation Frame
  requestAnimationFrame(draw);
}

//Event Stuff
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);


function mousedownHandler() {
  mouseIsPressed = true;

  // Play propeller sound
  propeller.CurrentTime = 0;
  propeller.play();

  // Start game on mouse press
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}