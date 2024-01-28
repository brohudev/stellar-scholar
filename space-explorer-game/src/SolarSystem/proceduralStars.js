import * as PIXI from 'pixi.js'
const spriteDir='./icons/star ';
const types=5;
const textures=[];
for(let i=0;i<types;i++)
  textures.push(PIXI.Texture.from(spriteDir+(i+1)+'.png'));
const stars=[];
for(let i=0;i<100;i++)
  stars.push(new PIXI.Sprite(textures[i%types]));
console.log(stars,textures)
let staged=false;

function moveStars(){
  stars.forEach(star=>{
    star.pos.x=Math.round()*100;
    star.pos.y=Math.round()*100;
  });
}
function generateStars(app){
  stars.forEach(star=>{
    star.scale.set(100,100)
    star.pos={x:0,y:0}
    app.stage.addChild(star)
  });
  return stars;
}
export {generateStars,moveStars};