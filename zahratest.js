import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#00000000',
    resizeTo: window,
});

document.body.appendChild(app.view);

// create a new Sprite from an image path
const rocket = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

// center the sprite's anchor point
rocket.anchor.set(1);

// move the sprite to the center of the screen
rocket.x = app.screen.width / 2;
rocket.y = app.screen.height / 2;
   const rotationEasing = 0.1;


const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    window.addEventListener('keydown', (e) => {
      keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      keys[e.key] = false;
    });

const gravity = 0.1; // You can adjust this value to control the strength of gravity
let velocityY = 5;
// Apply gravity

    // Update function
    app.ticker.add(() => {
      const speed = 5;
      const vspeed = 1;
    velocityY += gravity;
      if (keys['w']) {
        rocket.y -= speed;
      }

      if (keys['a']) {
        rocket.x -= speed;
      }

      if (keys['s']) {
        rocket.y += speed;
      }

      if (keys['d']) {
        rocket.x += speed;
      }
      rocket.y += velocityY;
       if (rocket.y > app.screen.height || rocket.y == 0) {
        rocket.y = app.screen.height;
        velocityY = 0; // Reset velocity when hitting the bottom
       }
        if (keys['a']) {
        // Rotate based on movement direction with scaling factor
        rocket.rotation = -Math.atan2(velocityY, speed) * 2;
      } else if(keys['d']){
        rocket.rotation = Math.atan2(velocityY, speed) * 2;
      }
      else {
        // Gradually adjust rotation back to 0 when not turning
        //rocket.rotation += rotationEasing * (0 - rocket.rotation);
      }
    });
app.stage.addChild(rocket);
