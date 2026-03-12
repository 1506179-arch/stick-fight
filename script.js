// Stick Fight Game Logic in JavaScript

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const COLORS = ['yellow', 'blue', 'green', 'red'];
const PLAYER_COUNT = 2;
const PLAYER_SIZE = 20;
const COLLISION_THRESHOLD = 15;

// Players array
let players = [];

function initializePlayers() {
    for (let i = 0; i < PLAYER_COUNT; i++) {
        players.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: COLORS[i],
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            health: 100
        });
    }
}

function drawPlayers() {
    players.forEach(player => {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    });
}

function handleInput(playerIndex) {
    document.addEventListener('keydown', function(event) {
        const player = players[playerIndex];
        switch (event.key) {
            case 'ArrowUp': player.y -= 5; break;
            case 'ArrowDown': player.y += 5; break;
            case 'ArrowLeft': player.x -= 5; break;
            case 'ArrowRight': player.x += 5; break;
        }
    });
}

function checkCollision() {
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            const dx = players[i].x - players[j].x;
            const dy = players[i].y - players[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < COLLISION_THRESHOLD) {
                players[i].health -= 10;
                players[j].health -= 10;
                if (players[i].health <= 0) { /* handle elimination */ }
                if (players[j].health <= 0) { /* handle elimination */ }
            }
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

initializePlayers();
handleInput(0); // Player 1 controls
handleInput(1); // Player 2 controls

requestAnimationFrame(gameLoop);