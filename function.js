// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawCore();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  }
  // Draw game Element
  function runGame() {
   // Logic
    moveHeli();
    moveWalls();
    checkCollisions();
   // Draw
    drawGame();
  }
  
  function moveHeli() {
    // Accelerate upward if mouse pressed
    if (mouseIsPressed) {
      heli.speed += -1.2;
    }
    // Apply Accelration 
    heli.speed += heli.accelY;
  
    // Constrain Speed (Max/Min)
    if (heli.speed > 5) {
       heli.speed = 5; 
      } else if (heli.speed < -5) {
       heli.speed = -5;
      }
    
    // Move Helicoptor by its speed
    heli.y += heli.speed;
  }
  
  function moveWalls() {
    // Wall 1
    wall1.x += wallSpeed
    if (wall1.x +wall1.w < 0) {
      wall1.x = wall3.x + 500;
      wall1.y = Math.random() * 300 + 100;
    }
    
    wall2.x += wallSpeed
    if (wall2.x +wall2.w < 0) {
      wall2.x = wall1.x + 500;
      wall2.y = Math.random() * 300 + 100;
    }
    
    wall3.x += wallSpeed
    if (wall3.x +wall3.w < 0) {
      wall3.x = wall2.x + 500;
      wall3.y = Math.random() * 300 + 100;
    }
  }
  
  function checkCollisions() {
    //Collision with top and bottom 
    if (heli.y < 50) {
      gameOver();
    } else if (heli.y + heli.h > cnv.height + -50) {
      gameOver();
    } 
     // Check Collison of wall
    if (rectCollide(heli, wall1)) {
       gameOver();
     } else if (rectCollide(heli, wall2)) {
       gameOver();
     } else if (rectCollide(heli, wall3)) {
       gameOver();
     }
  }
  
  function gameOver() {
    explosion.play();
    state = "gameover";
    
  
    setTimeout(reset, 3000);
  }
  
  // Draw Game Elements
  function drawGame() {
    drawCore();
    drawWalls();
  }
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawCore()
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
  }
  
  // HELPER FUNCTIONS
  
  function reset () {
   
   state = "start";
   heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accelY: 0.7
  }
  
    wallSpeed = -2;
    distanceTravelled = 0;
    speedUpActive = false;
    
    wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  }
  
    wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  }
  
    wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
  }
  }
  
  function drawWalls() {
    ctx.fillStyle = "red";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  }
  
  function drawCore() {
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText(`DISTANCE: ${distanceTravelled}`, 25, cnv.height - 15);
    ctx.fillText(`BEST: ${bestDistance}`, cnv.width - 250, cnv.height - 15);
  
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y);
  }