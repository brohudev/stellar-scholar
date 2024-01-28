import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  backgroundColor: "#696969",
  resizeTo: window,
});

document.body.appendChild(app.view);

const surfer = PIXI.Sprite.from("astronaut.png");
const background = PIXI.Sprite.from("pixelbg2.png");
background.scale.set(3, 4.75);
app.stage.addChild(background);
background.anchor.set(0.5);
background.x = app.screen.width / 2;
background.y = app.screen.height / 2;
surfer.anchor.set(0.5);
surfer.x = app.screen.width / 2;
surfer.y = app.screen.height / 2;
surfer.scale.set(0.5);
app.stage.addChild(surfer);
let chances = 3;
const obstacles = [];
const obstacleImages = [
  "dust storm 1.png",
  "dust storm 2.png",
  "Layer 1.png",
  "Layer 3.png",
  "Layer 5.png",
  "Layer 8.png",
];

// Listen for animate update
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Update function
app.ticker.add(() => {
  const speed = 5;

  if (keys["w"]) {
    surfer.y -= speed;
    background.y -= speed * 0.7;
  }

  if (keys["a"]) {
    surfer.x -= speed;
    background.x -= speed * 0.7;
  }

  if (keys["s"]) {
    surfer.y += speed;
    background.y += speed * 0.7;
  }

  if (keys["d"]) {
    surfer.x += speed;
    background.x += speed * 0.7;
  }

  // Generate obstacles with a delay
  if (Math.random() < 0.06) {
    generateObstacle();
  }

  //keep in bounds
  if (surfer.x < 0) {
    surfer.x = 0;
  }
  if (surfer.x > app.screen.width) {
    surfer.x = app.screen.width;
  }
  if (surfer.y < 0) {
    surfer.y = 0;
  }
  if (surfer.y > app.screen.height) {
    surfer.y = app.screen.height;
  }

  // Move existing obstacles
  for (const obstacle of obstacles) {
    obstacle.x -= 6; // Adjust the speed of obstacles

    // Check for collisions with obstacles
    if (collisionDetection(surfer, obstacle)) {
      obstacle.rotation += 0.01;
      console.log("Collision detected!");
      app.stage.removeChild(obstacle);
      chances--;

      // Optional: You can add a visual indicator or message for the player

      if (chances <= 0) {
        // Game over logic, for example, display a game over screen or reset the game
        gameOver();
      }
    }
  }
});
//this doesnt work pls hellb
const collisionDistances = [500, 200, 200, 200, 200, 200];
function collisionDetection(sprite1, sprite2) {
  const len = (sprite1.x - sprite2.x) ** 2 + (sprite1.y - sprite2.y) ** 2;
  return (
    len <
    sprite2.width / 2 + sprite2.height / 2 + sprite1.width + sprite1.height
  );
}

function generateObstacle() {
  const randomImageIndex = Math.floor(Math.random() * obstacleImages.length);
  const obstacle = PIXI.Sprite.from(obstacleImages[randomImageIndex]);
  obstacle.imgIndex = randomImageIndex;
  obstacle.anchor.set(0.5);

  // Set a random starting position outside the screen
  const randomSide = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  switch (randomSide) {
    case 0: // top
      obstacle.x = Math.random() * app.screen.width;
      obstacle.y = -obstacle.height / 2;
      break;
    case 1: // right
      obstacle.x = app.screen.width + obstacle.width / 2;
      obstacle.y = Math.random() * app.screen.height;
      break;
    case 2: // bottom
      obstacle.x = Math.random() * app.screen.width;
      obstacle.y = app.screen.height + obstacle.height / 2;
      break;
    case 3: // left
      obstacle.x = -obstacle.width / 2;
      obstacle.y = Math.random() * app.screen.height;
      break;
    default:break;
  }

  obstacle.scale.set(1);
  app.stage.addChild(obstacle);
  obstacles.push(obstacle);
}

const minigame=app;
let canvas;
minigame.setUp=(main)=> canvas=main;
function gameOver() {
  console.log("Game Over");
  const parent=app.view.parentElement;
  canvas.current.remove();
  canvas.current=canvas.main.view;
  app.ticker.stop();
  canvas.main.ticker.start();
  parent.appendChild(canvas.current);
}

minigame.ticker.stop();

export {minigame}