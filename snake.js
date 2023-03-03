// Get the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the initial game state
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = getRandomFood();
let score = 0;

// Set up the game loop
setInterval(gameLoop, 100);

// Handle keyboard input
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
}

function gameLoop() {
    // Move the snake
    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === "up") {
        head.y--;
        if (head.y < 0) {
            head.y = canvas.height / 10 - 1;
        }
    } else if (direction === "down") {
        head.y++;
        if (head.y >= canvas.height / 10) {
            head.y = 0;
        }
    } else if (direction === "left") {
        head.x--;
        if (head.x < 0) {
            head.x = canvas.width / 10 - 1;
        }
    } else if (direction === "right") {
        head.x++;
        if (head.x >= canvas.width / 10) {
            head.x = 0;
        }
    }
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFood();
        score += 10;
    } else {
        snake.pop();
    }

    // Check for collision with own tail
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }

    // Draw the food
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}


function gameOver() {
    alert("Game over! Score: " + score);
    location.reload();
}

function getRandomFood() {
    return {
        x: Math.floor(Math.random() * canvas.width / 10),
        y: Math.floor(Math.random() * canvas.height / 10)
    };
}
