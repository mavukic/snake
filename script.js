const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let score = 0;
let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
let direction = 'RIGHT';
let food = generateFood();
let gameInterval;

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        window.location.reload();  // Reload the page to restart the game
    }

    if (eatFood()) {
        score += 10;
        food = generateFood();
        snake.push({ ...snake[snake.length - 1] }); // Add a new segment to the snake
        updateScore();
    }

    draw();
}

function moveSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'UP':
            head.y -= gridSize;
            break;
        case 'DOWN':
            head.y += gridSize;
            break;
        case 'LEFT':
            head.x -= gridSize;
            break;
        case 'RIGHT':
            head.x += gridSize;
            break;
    }

    snake.unshift(head); // Add new head to the snake
    snake.pop(); // Remove tail unless we just ate food (which keeps the last segment)
}

function checkCollision() {
    const head = snake[0];

    // Check for wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function eatFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function generateFood() {
    const foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x: foodX, y: foodY };
}

function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = "#00FF00"; // Snake color
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }

    ctx.fillStyle = "#FF0000"; // Food color
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Key controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (e.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Start the game loop
function startGame() {
    gameInterval = setInterval(updateGame, 100); // Update every 100ms
}

startGame();
