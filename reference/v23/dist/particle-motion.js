/* Original canvas animation inspired by the reference's interaction behaviour.
   No reference assets or code are included. All shapes represent existing courses. */
(()=>{
 'use strict';
 const stage=document.querySelector('.particle-stage'),canvas=document.getElementById('risk-particles');
 if(!stage||!canvas||typeof canvas.getContext!=='function')return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const slots=[...document.querySelectorAll('.programme-scroll-slot')];
 if(!slots.length)return;
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 const count=660,points=[],mouse={x:-9999,y:-9999},cursor={x:-9999,y:-9999};
 let active=0,width=1,height=1,frame=null,scrollFrame=null,visible=true,lastPaint=0,time=0;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 function line(pointsIn,n,closed=false){
  const vertices=closed?[...pointsIn,pointsIn[0]]:pointsIn,lengths=[];let total=0;
  for(let i=0;i<vertices.length-1;i++){const a=vertices[i],b=vertices[i+1];const length=Math.hypot(b[0]-a[0],b[1]-a[1]);lengths.push(length);total+=length;}
  return Array.from({length:n},(_,index)=>{let distance=total*index/Math.max(1,n-1),segment=0;while(segment<lengths.length-1&&distance>lengths[segment]){distance-=lengths[segment];segment++;}const a=vertices[segment],b=vertices[segment+1],t=lengths[segment]?distance/lengths[segment]:0;return{x:a[0]+(b[0]-a[0])*t,y:a[1]+(b[1]-a[1])*t};});
 }
 function ring(n,r,start=0,end=Math.PI*2){return Array.from({length:n},(_,i)=>{const angle=start+(end-start)*i/Math.max(1,n-1);return{x:Math.cos(angle)*r,y:Math.sin(angle)*r};});}
 const shapes=[[],[],[]];
 // Continuity: concentric cycles and a forward arrow.
 for(let layer=0;layer<4;layer++)shapes[0].push(...ring(130,.82-layer*.14,-Math.PI*.92,Math.PI*.83));
 shapes[0].push(...line([[-.45,.06],[.1,-.48],[.55,-.05]],80),...line([[.22,-.06],[.55,-.05],[.56,-.38]],60));
 // AI management: a processor outline, connections and the letters AI.
 for(let layer=0;layer<3;layer++){const r=.74-layer*.12;shapes[1].push(...line([[-r,-r],[r,-r],[r,r],[-r,r]],100,true));}
 for(const x of [-.48,-.16,.16,.48])for(const side of [-1,1]){shapes[1].push(...line([[x,side*.75],[x,side*.98]],16));shapes[1].push(...line([[side*.75,x],[side*.98,x]],16));}
 shapes[1].push(...line([[-.35,.3],[-.09,-.32],[.17,.3]],50),...line([[-.25,.1],[.07,.1]],20),...line([[.37,-.32],[.37,.3]],34));
 // Information security: a layered shield and verification check.
 for(let layer=0;layer<4;layer++){const scale=1-layer*.11;shapes[2].push(...line([[0,-.9],[.75,-.59],[.67,.16],[.4,.55],[0,.91],[-.4,.55],[-.67,.16],[-.75,-.59]].map(([x,y])=>[x*scale,y*scale]),130,true));}
 shapes[2].push(...line([[-.36,-.02],[-.08,.26],[.38,-.29]],140));
 function target(index,shape){const path=shapes[shape],point=path[Math.floor(index/count*path.length)];const depth=Math.sin(index*2.399963)*.11;return{x:point.x,y:point.y,z:depth};}
 for(let index=0;index<count;index++){const position=target(index,0);points.push({...position,seed:index*2.399963,size:1.05+(index%5)*.18});}
 function size(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);width=rect.width||1;height=rect.height||1;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);schedule();}
 function schedule(){if(frame===null&&visible&&!document.hidden)frame=requestAnimationFrame(paint);}
 function paint(timestamp){
  frame=null;if(!visible||document.hidden)return;
  const reduced=preference.matches||!finePointer.matches;
  if(!reduced&&timestamp-lastPaint<32){schedule();return;}
  const delta=Math.min((timestamp-lastPaint)/1000||.033,.1);lastPaint=timestamp;time+=delta;
  const easing=reduced?1:1-Math.exp(-6*delta),cursorEase=reduced?1:1-Math.exp(-9*delta);
  cursor.x+=(mouse.x-cursor.x)*cursorEase;cursor.y+=(mouse.y-cursor.y)*cursorEase;
  ctx.clearRect(0,0,width,height);const radius=Math.min(width*.36,height*.40),parallax=!reduced&&finePointer.matches&&mouse.x>-1000;
  const shiftX=parallax?(cursor.x-width/2)*.026:0,shiftY=parallax?(cursor.y-height/2)*.026:0;
  for(let index=0;index<points.length;index++){
   const point=points[index],destination=target(index,active);point.x+=(destination.x-point.x)*easing;point.y+=(destination.y-point.y)*easing;point.z+=(destination.z-point.z)*easing;
   const pulse=reduced?0:Math.sin(time*.8+point.seed)*1.4,depthScale=1+point.z;
   let x=width/2+point.x*radius*depthScale+shiftX+Math.cos(point.seed)*pulse,y=height/2+point.y*radius*depthScale+shiftY+Math.sin(point.seed)*pulse;
   const dx=x-cursor.x,dy=y-cursor.y,distance=Math.hypot(dx,dy),influence=parallax?Math.pow(clamp(1-distance/150,0,1),2):0;
   if(distance>0&&influence>0){x+=dx/distance*influence*16;y+=dy/distance*influence*16;}
   const red=Math.round(93+(54-93)*influence),green=Math.round(138+(151-138)*influence),blue=Math.round(191+(255-191)*influence),alpha=.38+(index%7)*.055+influence*.23;
   ctx.beginPath();ctx.arc(x,y,point.size*(1+influence*.85),0,Math.PI*2);ctx.fillStyle=`rgba(${red},${green},${blue},${alpha})`;ctx.fill();
  }
  stage.classList.add('has-particles');
  if(!reduced&&finePointer.matches)schedule();
 }
 function scroll(){
  scrollFrame=null;const middle=window.innerHeight*.52;let nearest=0,best=Infinity;
  slots.forEach((slot,index)=>{const rect=slot.getBoundingClientRect(),distance=Math.abs(rect.top+rect.height*.5-middle);if(distance<best){best=distance;nearest=index;}
   const progress=preference.matches?1:clamp((window.innerHeight*.92-rect.top)/(window.innerHeight*.6),0,1),card=slot.querySelector('.programme-card');
   if(card){card.classList.add('scroll-driven-card');card.style.setProperty('--scroll-opacity',String(.25+.75*progress));card.style.setProperty('--scroll-rise',(65*(1-progress)).toFixed(1)+'px');}
  });
  active=nearest;slots.forEach((slot,index)=>slot.classList.toggle('is-scroll-active',index===active));
  const slot=slots[active];document.getElementById('particle-code').textContent=slot.dataset.standardCode;document.getElementById('particle-title').textContent=slot.dataset.standardTitle;const courseLink=document.getElementById('particle-course-link');courseLink.href='/courses/#course-'+slot.dataset.standardId;courseLink.setAttribute('aria-label','Explore '+slot.dataset.standardCode+' '+slot.dataset.standardTitle+' courses');
  canvas.setAttribute('aria-label','Interactive particle illustration representing '+slot.dataset.standardTitle+'.');schedule();
 }
 function queueScroll(){if(scrollFrame===null)scrollFrame=requestAnimationFrame(scroll);}
 window.addEventListener('scroll',queueScroll,{passive:true});window.addEventListener('resize',()=>{size();queueScroll();},{passive:true});
 stage.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||preference.matches||!finePointer.matches)return;const rect=canvas.getBoundingClientRect();const firstMove=mouse.x<-1000;mouse.x=event.clientX-rect.left;mouse.y=event.clientY-rect.top;if(firstMove){cursor.x=mouse.x;cursor.y=mouse.y;}schedule();});
 stage.addEventListener('pointerleave',()=>{mouse.x=-9999;mouse.y=-9999;});
 preference.addEventListener?.('change',()=>{mouse.x=-9999;mouse.y=-9999;queueScroll();schedule();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame!==null)cancelAnimationFrame(frame);frame=null;}else schedule();});
 if(typeof IntersectionObserver==='function'){
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){lastPaint=0;schedule();}else if(frame!==null){cancelAnimationFrame(frame);frame=null;}},{rootMargin:'80px'});observer.observe(stage);
 }
 size();scroll();
})();
