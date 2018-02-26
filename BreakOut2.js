var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");

var dx = 3 //speed

var dy = -3 //speed

var x = canvas.width / 3; //where it's start from

var y = canvas.height - 30;

var ballRadius = 15;

//paddle

var paddleHeight = 10;

var paddleWidth = 100;

var paddleX = (canvas.width - paddleWidth) / 2;

//Keybord

var rightPressed = false;

var leftPressed = false;

var aPressed = false;

var dPressed = false;

//bricks

var brickRowCount = 4;

var brickColumnCount = 7;

//var brickRowCount2 = 2;

//var brickColumnCount2 = 7;

var brickWidth = 75;

var brickHeight = 20;

var brickPadding = 20;

var brickOffsetTop = 20;

var brickOffsetLeft = 40;



var bricks = [];

for (c = 0; c < brickColumnCount; c++) {

  bricks[c] = [];

  for (r = 0; r < brickRowCount - 1; r++) {

    bricks[c][r] = {

      x: 0,

      y: 0,

      status: 1,



    };

  }

  for (r = brickRowCount - 1; r < brickRowCount; r++) {

    bricks[c][r] = {

      x: 0,

      y: 0,

      status: 2,



    };

  }

}




//score

var score = 0;

//lives

var lives = 2;

//levels

var levels = 3;



const buttonElement = document.querySelector('button');

const buttonClicked = function() {

  return draw();

}

//events

document.addEventListener("keydown", keyDownHandler, false);

document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("keydown", keyAHandler, false);

document.addEventListener("keyup", keyDHandler, false);



function keyDownHandler(e) {

  if (e.keyCode == 37) {

    rightPressed = true;

  } else if (e.keyCode == 39) {

    leftPressed = true;

  }

}


function keyUpHandler(e) {

  if (e.keyCode == 37) {

    rightPressed = false;

  } else if (e.keyCode == 39) {

    leftPressed = false;

  }

}


function keyAHandler(e) {

  if (e.keyCode == 68) {

    aPressed = true;

  } else if (e.keyCode == 65) {

    dPressed = true;

  }

}



function keyDHandler(e) {

  if (e.keyCode == 68) {

    aPressed = false;

  } else if (e.keyCode == 65) {

    dPressed = false;

  }

}





function drawBall() {

  ctx.beginPath();

  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false); //ball size

  ctx.fillStyle = "#a72020";

  ctx.fill();

  ctx.closePath();

}



function drawPaddle() {

  ctx.beginPath();

  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

  ctx.fillStyle = "#171717";

  ctx.fill();

  ctx.closePath();

}





function drawBricks() {

  for (c = 0; c < brickColumnCount; c++) {

    for (r = 0; r < brickRowCount; r++) {

      if (bricks[c][r].status == 1) {

        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;

        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        bricks[c][r].x = brickX;

        bricks[c][r].y = brickY;

        ctx.beginPath();

        ctx.rect(brickX, brickY, brickWidth, brickHeight);

        ctx.fillStyle = "#171717";

        ctx.fill();

        ctx.closePath();

      } else if (bricks[c][r].status == 2) {

        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;

        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        bricks[c][r].x = brickX;

        bricks[c][r].y = brickY;

        ctx.beginPath();

        ctx.rect(brickX, brickY, brickWidth, brickHeight);

        ctx.fillStyle = "#a72020";

        ctx.fill();

        ctx.closePath();

      }

    }

  }

}



function drawScore() {

  ctx.font = "14px Times New Roman";

  ctx.fillStyle = "#171717";

  ctx.fillText("Score: " + score, 8, 10);

}



function drawLives() {

  ctx.font = "14px Times New Roman";

  ctx.fillStyle = "#171717";

  ctx.fillText("Lives: " + lives, canvas.width - 65, 10);

}

function drawLevels() {

  ctx.font = "14px Times New Roman";

  ctx.fillStyle = "#171717";

  ctx.fillText("Levels: " + levels, canvas.width / 2, 10);

}



function collisionDetection() {

  for (c = 0; c < brickColumnCount; c++) {

    for (r = 0; r < brickRowCount; r++) {

      var b = bricks[c][r];



      if (b.status == 2) {


        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          var bLow = bricks[c][r - 1];
          dy = -dy;

          b.status = 0;

          bLow.status = 2;

          score++;

          if (score == brickRowCount * brickColumnCount) {


            alert("YOU WIN, CONGRATULATIONS!😀");
            levels++;
            if (levels == 2) {
              document.location.reload();
              dx + 10;
              dy + 10;
            }


          }

        }

      }

    }

  }

}




function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  drawPaddle();

  drawBricks();

  collisionDetection();

  drawScore();

  drawLives();

  drawLevels();



  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {

    dx = -dx;

  }

  if (y + dy < ballRadius) {

    dy = -dy;

  } else if (y + dy > canvas.height - ballRadius) {

    if (x > paddleX && x < paddleX + paddleWidth) {

      dy = -dy;

    } else {



      lives--;

      if (!lives) {

        alert("GAME OVER");

        document.location.reload();

      } else {

        x = canvas.width / 2;

        y = canvas.height - 30;

        dx = 3;

        dy = -3;

        paddleX = (canvas.width - paddleWidth) / 2;

      }

    }

  }





  if (leftPressed && paddleX < canvas.width - paddleWidth) {

    paddleX += 10;

  } else if (rightPressed && paddleX > 0) {

    paddleX -= 10;

  }

  if (aPressed && paddleX < canvas.width - paddleWidth) {

    paddleX += 10;

  } else if (dPressed && paddleX > 0) {

    paddleX -= 10;

  }



  x = x + dx;

  y = y + dy;

  requestAnimationFrame(draw);

}





buttonElement.addEventListener('click', buttonClicked);
