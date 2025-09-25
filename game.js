const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
});

const gravity = 0.8;
const ground = H - 80;

let player = { x: 50, y: ground, w: 50, h: 50, vx: 0, vy: 0, onGround: true };

function update() {
  player.x += player.vx;
  player.vy += gravity;
  player.y += player.vy;

  if (player.y + player.h >= ground) {
    player.y = ground - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  // Limites laterais
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > W) player.x = W - player.w;
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  // chão
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(0, ground, W, H - ground);

  // personagem
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();

// Controles
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const jumpBtn = document.getElementById('jump');

let leftPressed = false;
let rightPressed = false;

function handleMove() {
  if (leftPressed) player.vx = -5;
  else if (rightPressed) player.vx = 5;
  else player.vx = 0;
}

leftBtn.addEventListener('touchstart', () => { leftPressed = true; handleMove(); });
leftBtn.addEventListener('touchend',   () => { leftPressed = false; handleMove(); });
rightBtn.addEventListener('touchstart',() => { rightPressed = true; handleMove(); });
rightBtn.addEventListener('touchend',  () => { rightPressed = false; handleMove(); });

jumpBtn.addEventListener('touchstart', () => {
  if (player.onGround) {
    player.vy = -15;
    player.onGround = false;
  }
});
