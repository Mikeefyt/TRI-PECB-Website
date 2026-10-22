(()=>{
 'use strict';
 const canvas=document.getElementById('cursor-field');
 if(!canvas||typeof canvas.getContext!=='function')return;
 const ctx=canvas.getContext('2d');if(!ctx||typeof window.matchMedia!=='function')return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),fine=window.matchMedia('(hover: hover) and (pointer: fine)');
 let width=1,height=1,frame=null,previous=0,settle=0,active=false;
 const mouse={x:0,y:0},current={x:0,y:0};
 const allowed=()=>fine.matches&&!reduced.matches&&!document.hidden;
 function clear(){if(frame!==null)cancelAnimationFrame(frame);frame=null;active=false;settle=0;canvas.classList.remove('is-active');ctx.clearRect(0,0,width,height);}
 function size(){width=window.innerWidth;height=window.innerHeight;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);if(active)schedule();}
 function schedule(){if(frame===null&&active&&allowed())frame=requestAnimationFrame(paint);}
 function paint(timestamp){
  frame=null;if(!active||!allowed()){clear();return;}
  if(timestamp-previous<24){schedule();return;}
  const delta=Math.min((timestamp-previous)/1000||.033,.1);previous=timestamp;
  const ease=1-Math.exp(-12*delta);current.x+=(mouse.x-current.x)*ease;current.y+=(mouse.y-current.y)*ease;
  ctx.clearRect(0,0,width,height);
  const glow=ctx.createRadialGradient(current.x,current.y,0,current.x,current.y,145);glow.addColorStop(0,'rgba(34,98,243,.055)');glow.addColorStop(1,'rgba(34,98,243,0)');ctx.fillStyle=glow;ctx.fillRect(current.x-145,current.y-145,290,290);
  // A stable grid makes the local colour and displacement visible as the cursor passes.
  const space=30,startX=Math.floor((current.x-150)/space)*space,startY=Math.floor((current.y-150)/space)*space;
  for(let x=startX;x<current.x+150;x+=space)for(let y=startY;y<current.y+150;y+=space){
   const dx=x-current.x,dy=y-current.y,distance=Math.hypot(dx,dy);if(distance>=145)continue;
   const influence=Math.pow(1-distance/145,2),shift=influence*15,px=x+(distance?dx/distance*shift:0),py=y+(distance?dy/distance*shift:0);
   ctx.beginPath();ctx.arc(px,py,.8+influence*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(45,129,255,${influence*.6})`;ctx.fill();
  }
  if(Math.hypot(mouse.x-current.x,mouse.y-current.y)>.1){settle=0;schedule();}else if(settle++<3)schedule();
 }
 document.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||!allowed())return;if(!active){current.x=event.clientX;current.y=event.clientY;}mouse.x=event.clientX;mouse.y=event.clientY;active=true;settle=0;canvas.classList.add('is-active');schedule();},{passive:true});
 document.addEventListener('pointerleave',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
 reduced.addEventListener?.('change',clear);fine.addEventListener?.('change',clear);
 window.addEventListener('resize',size,{passive:true});window.addEventListener('scroll',()=>{if(active){settle=0;schedule();}},{passive:true});size();
})();
