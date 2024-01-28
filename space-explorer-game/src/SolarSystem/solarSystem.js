import * as PIXI from 'pixi.js';

const MAX_DISTANCE_FROM_PLANET=6000;
const MIN_DISTANCE_FROM_PLANET=2000;
const spriteDir='./icons/';

const app = new PIXI.Application({
    background: '#1099bb',
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

const camera=new Camera();


class Planet{
    constructor(radius,velocity,distance){
        this.radius=radius;
        this.velocity=velocity;
        this.distance=distance;
        this.time=0;
    }
    updatePos(sprite){
        sprite.x = camera.x+this.distance*Math.sin(this.velocity*this.time);
        sprite.y = camera.y+this.distance*Math.cos(this.velocity*this.time);
    }
}

const planetNames=['Mercury'/*,'Venus'*/,'Earth','Mars'/*,'Jupiter','Saturn'*/,'Uranus','Neptune'];
const planets={};
//planet params: radius, angular velocity,distance
const planetParams=[[1,.002],[1,.002],[1,.002],[1,.002],[1,.002],[1,.002],[1,.002],[1,.002]];

const rotationEasing = 0.1;
const gravity = 0.1;

const rocket=PIXI.Sprite.from(spriteDir+'Rocket.png');
rocket.x=app.view.width/2;
rocket.y=app.view.height/2;
rocket.scale.set(.1,.1);
app.stage.addChild(rocket);
console.log(rocket)

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
    
    camera.direction.y = camera.moveForward-camera.moveBackward;
    camera.direction.x = camera.moveRight-camera.moveLeft;
    normalize(camera.direction);
    const len=Math.sqrt(camera.velocity.x**2+camera.velocity.y**2);
    const sign=camera.velocity.x>0?-1:1;
    rocket.rotation=(sign*Math.acos(-camera.velocity.y/len));
    rocket.rotation=rocket.rotation||0;

    if ( camera.moveForward || camera.moveBackward ) 
        camera.velocity.y -= camera.direction.y * 40.0 * delta;
    if ( camera.moveLeft || camera.moveRight ) 
        camera.velocity.x -= camera.direction.x * 40.0 * delta;

    camera.x += camera.velocity.x * delta/100;
    camera.y += -camera.velocity.y * delta/100;
    //console.log(rocket.x,rocket.y)
});

//setup each planet
planetNames.forEach((planet,idx)=>{
    planets[planet]=new Planet(...planetParams[idx],200*(idx+1));
    const sprite=PIXI.Sprite.from(spriteDir+'planets/'+planet+'.png');
    planets[planet].sprite=sprite;
    app.stage.addChild(sprite);
    app.ticker.add((delta) => {
        planets[planet].time+=delta;
        planets[planet].updatePos(sprite);
        const dx=rocket.scale._x-sprite.x,dy=rocket.scale._y-sprite.y;
        const dist=dx**2+dy**2;
        if(dist<MAX_DISTANCE_FROM_PLANET){
            if(dist<MIN_DISTANCE_FROM_PLANET){
                
            }
            const a=Math.sqrt(rocket.scale._x**2+rocket.scale._y**2);
            const b=Math.sqrt(sprite.x**2+sprite.y**2);
            const angle=Math.acos((rocket.scale._x*sprite.x+rocket.scale._y*sprite.y)/(a*b));

            rocket.rotation += rotationEasing * (angle - rocket.rotation);
            console.log(rocket.rotation)
        }
    });
});

const canvas=app.view;
export {canvas};