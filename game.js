const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
let playerY = 200;

const aiX = 910;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = -10;
let ballSpeedY = 10;

let scorePlayer = 0;
let scoreAI = 0;

function drawPlayer() {
    ctx.fillStyle = '#7FFF00';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight)
}

function drawAI() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight)
}

function updateBallPosition() {
    const prevBallX = ballX;
    const prevBallY = ballY;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
        // speedUp();
    }

    if (ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
        scoreAI += 1;
        // speedUp();
    }

    if (ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        scorePlayer += 1;
    }

    const playerXRight = playerX + paddleWidth;

    if (prevBallX > playerXRight && ballX <= playerXRight) {
        const isBelowTop = ballY + ballSize > playerY;
        const isAboveBottom = ballY < playerY + paddleHeight;
        if (isBelowTop && isAboveBottom) {
            ballSpeedX = -ballSpeedX;
        }
    }

    const ballXRight = ballX + ballSize;
    const prevBallXRight = prevBallX + ballSize;

    if (prevBallXRight < aiX && ballXRight >= aiX) {
        const isBelowTop = ballY + ballSize > aiY;
        const isAboveBottom = ballY < aiY + paddleHeight;
        if (isBelowTop && isAboveBottom) {
            ballSpeedX = -ballSpeedX;
        }
    }
}

function speedUp() {
    // console.log("przyspiesz")
    //predkoscx x
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += 0.5;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= 0.5;
    }
    //predkosc y
    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 0.5;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= 0.5;
    }
}

function drawBall() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function drawTable() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray";
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }
}

topCanvas = canvas.offsetTop;


function playerPosition(e) {
    // console.log("pozycja myszy to: " + (e.clientY - topCanvas));
    playerY = e.clientY - topCanvas - paddleHeight / 2;

    if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight;

    }
    if (playerY <= 0) {
        playerY = 0;

    }

    // aiY = playerY;
}

function updateAiPosition() {
    var middlePaddel = aiY + paddleHeight / 2;
    var middleBall = ballY + ballSize / 2;
    const shiftValue = 10;
    const randomShift = Math.floor((Math.random() * shiftValue) + 1)

    const aiVector = (middleBall - middlePaddel) / 8;

    aiY += aiVector;
    // aiY = ballY - (paddleHeight / 2) // godmode
}


function drawScore() {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText(`${scorePlayer}:${scoreAI}`, 10, 480);
}

function updateGame() {
    updateBallPosition();
    updateAiPosition();

    drawTable();
    drawBall();
    drawPlayer();
    drawAI();
    drawScore();
}

setInterval(updateGame, 1000 / 60);
canvas.addEventListener("mousemove", playerPosition)