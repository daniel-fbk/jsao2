const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;
let topPos = innerHeight / 2;
let leftPos = innerWidth / 2;

class Player {
  constructor() {
    this.position = { x: innerWidth / 2, y: innerHeight / 2 };
    this.height = 50;
    this.width = 50;
  }
  draw() {
    canvasCtx.fillStyle = "#1361b9ff";
    canvasCtx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();
  }
}

class Platform {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.height = 40;
    this.width = 200;
  }
  draw() {
    canvasCtx.fillStyle = "#85af23ff";
    canvasCtx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const player = new Player();

// object with x and y coordinates
const platformPositions = [
  { x: 900, y: 450 },
  { x: 500, y: 300 },
  { x: 500, y: 700 },
];

// map method to create a new array using data from the platform class and setting x and y from platformPositions
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

// movespeed controls how far the players moves with each input
const moveSpeed = 10;
const keysPressed = {};

document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

document.addEventListener("click", (e) => {
  leftPos = e.offsetX;
  topPos = e.offsetY;
});

function update() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(update);

  // temporary variables for player x and y makes it easier to work with
  let newLeftPos = leftPos;
  let newTopPos = topPos;

  // checks if key pressed is true in the array, also checks if x or y is less than or more than canvas size
  if (keysPressed["a"] && leftPos > 0) {
    newLeftPos -= moveSpeed;
  }
  if (keysPressed["d"] && leftPos < canvas.width - player.width) {
    newLeftPos += moveSpeed;
  }
  if (keysPressed["w"] && topPos > 0) {
    newTopPos -= moveSpeed;
  }
  if (keysPressed["s"] && topPos < canvas.height - player.height) {
    newTopPos += moveSpeed;
  }

  let xColliding = false;
  let yColliding = false;

  // AABB collision
  // checks each platform to see if player is colliding, compares current and new position to enable gliding
  platforms.forEach((platform) => {
    if (
      newLeftPos < platform.position.x + platform.width &&
      newLeftPos + player.width > platform.position.x &&
      topPos < platform.position.y + platform.height &&
      topPos + player.height > platform.position.y
    ) {
      xColliding = true;
    }
  });

  platforms.forEach((platform) => {
    if (
      leftPos < platform.position.x + platform.width &&
      leftPos + player.width > platform.position.x &&
      newTopPos < platform.position.y + platform.height &&
      newTopPos + player.height > platform.position.y
    ) {
      yColliding = true;
    }
  });

  // if colliding is false, update position variable
  if (!xColliding) leftPos = newLeftPos;
  if (!yColliding) topPos = newTopPos;

  // moves the player
  player.position.x = leftPos;
  player.position.y = topPos;

  platforms.forEach((platform) => platform.draw());
  player.update();
}

// to start the animation loop
update();

// platforms.forEach((platform) => {
//   if (
//     player.position.y + player.height <= platform.position.y &&
//     newTopPos + player.height >= platform.position.y
//   ) {
//     topPos = newTopPos;
//   }
//   if (
//     player.position.x + player.width <= platform.position.x &&
//     newLeftPos + player.width >= platform.position.x
//   ) {
//     leftPos = newLeftPos;
//   }
// });

// platforms.forEach((platform) => {
//   const isColliding =
//     newLeftPos < platform.position.x + platform.width &&
//     newLeftPos + player.width > platform.position.x &&
//     newTopPos < platform.position.y + platform.height &&
//     newTopPos + player.height > platform.position.y;
//   console.log("true");

//   if (!isColliding) {
//     leftPos = newLeftPos;
//     topPos = newTopPos;
//   }
// });
