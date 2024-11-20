const ball = document.getElementById("ball");
const player2Indicator = document.getElementById("player2-indicator");
const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");

let player1Score = 0;
let player2Score = 0;
let timer = 30;
let gameInterval;
let timerInterval;
let gameRunning = false;

// Ball Movement
function moveBall() {
    const playAreaRect = document.querySelector(".play-area").getBoundingClientRect();
    const ballSize = 40;
    const maxX = playAreaRect.width - ballSize;
    const maxY = playAreaRect.height - ballSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

// Update Scores
function updateScores() {
    player1ScoreDisplay.textContent = `Player 1 Score: ${player1Score}`;
    player2ScoreDisplay.textContent = `Player 2 Score: ${player2Score}`;
}

// Start the Game
function startGame() {
    if (gameRunning) return;

    player1Score = 0;
    player2Score = 0;
    timer = 30;
    updateScores();
    updateTimer();
    gameRunning = true;

    startButton.style.display = "none";
    ball.style.display = "block";
    player2Indicator.style.display = "block";

    gameInterval = setInterval(moveBall, 800);
    timerInterval = setInterval(countdown, 1000);
}

// Countdown Timer
function countdown() {
    timer--;
    updateTimer();

    if (timer <= 0) {
        endGame();
    }
}

function updateTimer() {
    timerDisplay.textContent = `Time Left: ${timer}s`;
}

// End the Game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameRunning = false;

    ball.style.display = "none";
    player2Indicator.style.display = "none";
    startButton.style.display = "block";

    // Determine Winner
    if (player1Score > player2Score) {
        alert("Player 1 Wins!");
    } else if (player2Score > player1Score) {
        alert("Player 2 Wins!");
    } else {
        alert("It's a Tie!");
    }
}

// Ball Click Event for Player 1
ball.addEventListener("click", () => {
    if (gameRunning) {
        player1Score++;
        updateScores();
        moveBall();
    }
});

// Keyboard Controls for Player 2
let player2X = 100;
let player2Y = 100;

document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    const playAreaRect = document.querySelector(".play-area").getBoundingClientRect();

    switch (e.key) {
        case "w":
            player2Y = Math.max(0, player2Y - 20);
            break;
        case "s":
            player2Y = Math.min(playAreaRect.height - 30, player2Y + 20);
            break;
        case "a":
            player2X = Math.max(0, player2X - 20);
            break;
        case "d":
            player2X = Math.min(playAreaRect.width - 30, player2X + 20);
            break;
    }

    player2Indicator.style.left = `${player2X}px`;
    player2Indicator.style.top = `${player2Y}px`;

    // Check for Collision with Ball
    const ballRect = ball.getBoundingClientRect();
    const player2Rect = player2Indicator.getBoundingClientRect();

    if (
        player2Rect.left < ballRect.right &&
        player2Rect.right > ballRect.left &&
        player2Rect.top < ballRect.bottom &&
        player2Rect.bottom > ballRect.top
    ) {
        player2Score++;
        updateScores();
        moveBall();
    }
});

startButton.addEventListener("click", startGame);
