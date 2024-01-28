import * as PIXI from 'pixi.js';

function miniGame(gravity,colors){
  const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
  });
  const canvas=app.view;
  const ctx=canvas.getContext('2d');
  const gradient=ctx.createLinearGradient(0,0,0,1);
  colors.forEach(({color,offset}) => {
    gradient.addColorStop(offset,color);
  });
  return app;
}

export default miniGame;