// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let box = 20; // Size of each square
let snake = [{ x: 9 * box, y: 10 * box }]; // Snake starts at center
let direction = null; // Initial direction
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let score = 0;

// Control snake with keyboard arrows
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Main game function
function drawGame() {
    // Clear the canvas
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#32cd32' : '#66ff66'; // Snake head and body
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = '#ff6347'; // Tomato red for food
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop(); // Remove the tail
    }

    // Add new head
    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert('Game Over! Your Score: ' + score);
        location.reload(); // Restart the game
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Set the game loop
let game = setInterval(drawGame, 100); // Game speed (lower is faster)
