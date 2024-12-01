const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = [{ x: 9 * grid, y: 9 * grid }];
let apple = { x: 5 * grid, y: 5 * grid };
let dx = grid;
let dy = 0;
let snakeColor = 'green';
let gamePaused = false; // Track if the game is paused

// Start the game loop
gameLoop();

function gameLoop() {
    if (!gamePaused) {
        requestAnimationFrame(gameLoop);
        if (++count < 4) return;

        count = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        moveSnake();
        checkCollision();
        drawSnake();
        drawApple();
    }
}

// Reset game when game over
function resetGame() {
    snake = [{ x: 9 * grid, y: 9 * grid }];
    dx = grid;
    dy = 0;
    gamePaused = false; // Make sure game is not paused on reset
}

// Movement logic
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        apple.x = Math.floor(Math.random() * 20) * grid;
        apple.y = Math.floor(Math.random() * 20) * grid;
    } else {
        snake.pop();
    }
}

// Check for collisions with walls or the snake itself
function checkCollision() {
    const head = snake[0];

    // Collide with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("Game Over!");
        resetGame();
    }

    // Collide with self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            alert("Game Over!");
            resetGame();
        }
    }
}

// Drawing the snake on the canvas
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'black' : snakeColor; // Head is black, body is snakeColor
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
}

// Drawing the apple on the canvas
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid, grid);
}

// Listen for keypress events for snake movement and pause
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -grid;
        gamePaused = false; // Unpause on key press
    }

    if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = grid;
        gamePaused = false; // Unpause on key press
    }
    if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -grid;
        dy = 0;
        gamePaused = false; // Unpause on key press
    }
    if (e.key === 'ArrowRight' && dx === 0) {
        dx = grid;
        dy = 0;
        gamePaused = false; // Unpause on key press
    }

    // Pause functionality: Press 'P' to pause/unpause the game
    if (e.key === 'p' || e.key === 'P') {
        gamePaused = !gamePaused; // Toggle the paused state
        if (!gamePaused) {
            gameLoop(); // Ensure the game resumes from where it left off
        }
    }
});

// Color picker
document.getElementById('colorPicker').addEventListener('input', (e) => {
    snakeColor = e.target.value;
});
