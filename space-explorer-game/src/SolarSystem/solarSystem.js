import * as PIXI from 'pixi.js';

const DISTANCE_FROM_PLANET=30;
const spriteDir='./icons/';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

class Planet{
    constructor(radius,velocity,distance){
        this.radius=radius;
        this.velocity=velocity;
        this.distance=distance;
        this.time=0;
    }
    updatePos(sprite){
        sprite.x = this.distance*Math.sin(this.velocity*this.time);
        sprite.y = this.distance*Math.cos(this.velocity*this.time);
    }
}

const planetNames=[]//['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];
const planets={};
//planet params: radius, angular velocity,distance
const planetParams=[[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]];

const rocket=PIXI.Sprite.from(spriteDir+'Rocket.png');
app.stage.addChild(rocket);
console.log(rocket)
rocket.moveForward=0;
rocket.moveBackward=0;
rocket.moveLeft=0;
rocket.moveRight=0;
rocket.velocity={x:0,y:0};
rocket.direction={x:0,y:0};
window.onkeydown=ev=>{
    switch ( ev.code ) {
        case 'ArrowUp':
        case 'KeyW':
            rocket.moveForward = 1;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            rocket.moveLeft = 1;
            break;
        case 'ArrowDown':
        case 'KeyS':
            rocket.moveBackward = 1;
            break;
        case 'ArrowRight':
        case 'KeyD':
            rocket.moveRight = 1;
            break;
    }
};
window.onkeyup=ev=> {
    switch ( ev.code ) {
        case 'ArrowUp':
        case 'KeyW':
            rocket.moveForward = 0;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            rocket.moveLeft = 0;
            break;
        case 'ArrowDown':
        case 'KeyS':
            rocket.moveBackward = 0;
            break;
        case 'ArrowRight':
        case 'KeyD':
            rocket.moveRight = 0;
            break;
    }
};
const normalize=vec2=>{
    const len=Math.sqrt(vec2.x**2+vec2.y**2);
    vec2.x/=len;
    vec2.y/=len;
};

app.ticker.add((delta) => {
    rocket.velocity.x -= rocket.velocity.x * 10.0 * delta;
    rocket.velocity.y -= rocket.velocity.y * 10.0 * delta;
    
    rocket.direction.y = rocket.moveForward-rocket.moveBackward;
    rocket.direction.x = rocket.moveRight-rocket.moveLeft;
    normalize(rocket.direction);

    if ( rocket.moveForward || rocket.moveBackward ) 
        rocket.velocity.y -= rocket.direction.y * 40.0 * delta;
    if ( rocket.moveLeft || rocket.moveRight ) 
        rocket.velocity.x -= rocket.direction.x * 40.0 * delta;

    rocket.x += - rocket.velocity.x * delta/10000;
    rocket.y += - rocket.velocity.y * delta/10000;
});

//setup each planet
planetNames.forEach((planet,idx)=>{
    planets[planet]=new Planet(...planetParams[idx],idx+1);
    const sprite=PIXI.Sprite.from(spriteDir+planet);
    planets[planet].sprite=sprite;
    app.stage.addChild(sprite);
    app.ticker.add((delta) => {
        planets[planet].time+=delta;
        planets[planet].updatePos(sprite);
        if((rocket.scale._x-sprite.x)**2+(rocket.scale._y-sprite.y)**2<DISTANCE_FROM_PLANET){

        }
    });
});

const canvas=app.view;
export {canvas};