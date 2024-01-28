import * as PIXI from 'pixi.js';


const MAX_DISTANCE_FROM_PLANET=200;
const MIN_DISTANCE_FROM_PLANET=100;
const spriteDir='./icons/';

const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
});

class Camera{
    constructor(){
        this.moveForward=0;
        this.moveBackward=0;
        this.moveLeft=0;
        this.moveRight=0;
        this.velocity={x:0,y:0};
        this.direction={x:0,y:0};
        this.x=0;
        this.y=0;
    }
}

class Planet{
    constructor(radius,velocity,distance,sprite){
        this.sprite=sprite;
        sprite.scale.set(radius,radius);
        sprite.anchor.set(.5);
        this.velocity=velocity;
        this.distance=distance;
        this.time=0;
    }
    updatePos(){
        this.sprite.x = camera.x+this.distance*Math.sin(this.velocity*this.time);
        this.sprite.y = camera.y+this.distance*Math.cos(this.velocity*this.time);
    }
}

const starbgTexture = PIXI.Texture.from(spriteDir + 'starsbg.jpg');
const starbg = new PIXI.TilingSprite(
  starbgTexture,
  app.screen.width,
  app.screen.height
);
app.stage.addChild(starbg);
starbg.scale.set(3,2);
app.stage.addChild(starbg);
const camera=new Camera();

const planetNames=['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'];
const planets={};
//planet params: radius, angular velocity,distance
const planetParams=[[.1,0,0],[1,.001,200],[1,.003,400],[1,.0025,650],[1,.0035,850],[1,.002,1200],[1,.0022,1800],[1,.0015,2000],[1,.01,2300]];

const rotationEasing = 0.1;
const gravity = 0.1;

const flyingTexture = PIXI.Texture.from(spriteDir+'rocket with fire.png');
const stillTexture = PIXI.Texture.from(spriteDir+'rocket without fire.png');
const rocket=new PIXI.Sprite(stillTexture);
rocket.anchor.set(.5);
rocket.x=app.view.width/2;
rocket.y=app.view.height/2;
rocket.scale.set(.2,.2);
app.stage.addChild(rocket);

console.log(rocket,camera);

window.onkeydown=ev=>{
    switch ( ev.code ) {
        case 'ArrowUp':
        case 'KeyW':
            camera.moveForward = 1;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            camera.moveLeft = 1;
            break;
        case 'ArrowDown':
        case 'KeyS':
            camera.moveBackward = 1;
            break;
        case 'ArrowRight':
        case 'KeyD':
            camera.moveRight = 1;
            break;
    }
};
window.onkeyup=ev=> {
    switch ( ev.code ) {
        case 'ArrowUp':
        case 'KeyW':
            camera.moveForward = 0;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            camera.moveLeft = 0;
            break;
        case 'ArrowDown':
        case 'KeyS':
            camera.moveBackward = 0;
            break;
        case 'ArrowRight':
        case 'KeyD':
            camera.moveRight = 0;
            break;
    }
};
const normalize=vec2=>{
    const len=Math.sqrt(vec2.x**2+vec2.y**2);
    vec2.x/=len;
    vec2.y/=len;
};

app.ticker.add((delta)=> {
    camera.velocity.x -= camera.velocity.x * .01 * delta;
    camera.velocity.y -= camera.velocity.y * .01 * delta;

    camera.velocity.x=camera.velocity.x||0;
    camera.velocity.y=camera.velocity.y||0;
    
    camera.direction.y = camera.moveForward-camera.moveBackward;
    camera.direction.x = camera.moveRight-camera.moveLeft;
    normalize(camera.direction);
    const len=Math.sqrt(camera.velocity.x**2+camera.velocity.y**2);
    const sign=camera.velocity.x>0?-1:1;
    rocket.rotation=(sign*Math.acos(-camera.velocity.y/len));
    rocket.rotation=rocket.rotation||0;


    if(len>20&&!rocket.flying){
        rocket.texture=flyingTexture;
        rocket.flying=true;
    }
    else if(len<20&&rocket.flying){
        rocket.texture=stillTexture;
        rocket.flying=false;
    }

    if ( camera.moveForward || camera.moveBackward ) 
        camera.velocity.y -= camera.direction.y * 40.0 * delta;
    if ( camera.moveLeft || camera.moveRight ) 
        camera.velocity.x -= camera.direction.x * 40.0 * delta;

    camera.x += camera.velocity.x * delta/100;
    camera.y += -camera.velocity.y * delta/100;
    camera.x=camera.x||0;
    camera.y=camera.y||0;
    //console.log(rocket.x,rocket.y)
});

//setup each planet
planetNames.forEach((planet,idx)=>{
    const sprite=PIXI.Sprite.from(spriteDir+'planets/'+planet+'.png');
    planets[planet]=new Planet(...planetParams[idx],sprite);
    app.stage.addChild(sprite);
    app.ticker.add((delta) => {
        planets[planet].time+=delta;
        planets[planet].updatePos();
        const d={x:rocket.x-sprite.x,y:rocket.y-sprite.y};
        const dist=Math.sqrt(d.x**2+d.y**2);
        if(dist<MAX_DISTANCE_FROM_PLANET){
            if(dist<MIN_DISTANCE_FROM_PLANET){
                
            }
            const sign=d.x>0?-1:1;
            const angle=(sign*Math.acos(-d.y/dist));
            rocket.rotation += rotationEasing * (angle - rocket.rotation);
            console.log(rocket.rotation)
        }
    });
});

const canvas=app.view;
export {canvas};