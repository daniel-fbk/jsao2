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
// const platform = new Platform();

const platformPositions = [{ x: 900, y: 450 }];

const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const moveSpeed = 10;
const keysPressed = {};

document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

function update() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(update);
  let newLeftPos = leftPos;
  let newTopPos = topPos;

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

  // AABB collision
  platforms.forEach((platform) => {
    const isColliding =
      newLeftPos < platform.position.x + platform.width &&
      newLeftPos + player.width > platform.position.x &&
      newTopPos < platform.position.y + platform.height &&
      newTopPos + player.height > platform.position.y;

    if (!isColliding) {
      leftPos = newLeftPos;
      topPos = newTopPos;
    }
  });

  player.position.y = topPos;
  player.position.x = leftPos;

  platforms.forEach((platform) => platform.draw());
  player.update();
  console.log(player.position.x);
  // console.log(keysPressed);
}

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
