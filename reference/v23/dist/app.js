'use strict';
const standards = [
 {id:'22301',code:'ISO 22301',title:'Business Continuity',icon:'↗',description:'Explore business continuity management principles and ISO 22301 requirements. Build knowledge of business impact analysis, continuity strategies and planning for disruption, with a focus on review and continual improvement.',system:'business continuity management system',focus:['Business continuity principles and ISO 22301 requirements','Business impact analysis, continuity strategies and planning','Monitoring, review and continual improvement']},
 {id:'42001',code:'ISO/IEC 42001',title:'AI Management Systems',icon:'✳',description:'Explore AI management concepts and ISO/IEC 42001 requirements. Develop your understanding of governance, accountability and AI risk, and the processes used to evaluate and improve an AI management system.',system:'AI management system',focus:['AI management concepts and ISO/IEC 42001 requirements','Governance, responsibility and AI risk management','Management system evaluation and continual improvement']},
 {id:'27001',code:'ISO/IEC 27001',title:'Information Security',icon:'◇',description:'Explore information security management principles and ISO/IEC 27001 requirements. Build knowledge of information security risk, controls and management system evaluation to support a systematic approach to protecting information.',system:'information security management system',focus:['Information security principles and ISO/IEC 27001 requirements','Information security risk management and controls','Management system evaluation and continual improvement']}
];
const levels=[{name:'Foundation',days:2,AU:'AUD $400',MY:'MYR 1,180'},{name:'Lead Implementer',days:5,AU:'AUD $995',MY:'MYR 2,950'},{name:'Lead Auditor',days:5,AU:'AUD $995',MY:'MYR 2,950'}];
let market='AU',activeLevel='all',selectedCourse=null;
try { const saved=localStorage.getItem('thinkrisk-market'); if(['AU','MY'].includes(saved)) market=saved; } catch {}
const $=s=>document.querySelector(s);
function renderCourses(){
 if(!$('#course-grid'))return;
 $('#course-grid').innerHTML=standards.map(s=>`<article class="course-card" id="course-${s.id}"><div class="card-label"><span class="card-icon" aria-hidden="true">${s.icon}</span><span>${s.code}</span></div><h3>${s.title}</h3><p>${s.description}</p><div class="course-levels">${levels.filter(l=>activeLevel==='all'||l.name===activeLevel).map(l=>`<button class="course-level" data-course="${s.id}" data-course-level="${l.name}" aria-label="View ${s.code} ${l.name} course details"><span><strong>${l.name}</strong><small>${l.days}-day course structure · Self-paced online</small></span><b class="price">${l[market]}</b><span class="level-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><div class="card-footer"><span>SELF-PACED ONLINE</span><span>PECB PATHWAY</span></div></article>`).join('');
 initialisePointerCards();
}
function setMarket(next){if(!['AU','MY'].includes(next)) return;market=next;try{localStorage.setItem('thinkrisk-market',market)}catch{};document.querySelectorAll('[data-market]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.market===market)));document.querySelectorAll('[data-market-name]').forEach(b=>b.textContent=market==='AU'?'AUD':'MYR');if($('#form-market'))$('#form-market').value=market;if($('#additional-price'))$('#additional-price').textContent=market==='AU'?'AUD $600':'MYR 1,750';renderCourses();updateCourseFinder();}
function systemPhrase(standard){return (/^[aeiou]/i.test(standard.system)?'an ':'a ')+standard.system;}
function courseDetails(id,level){
 const s=standards.find(x=>x.id===id),l=levels.find(x=>x.name===level);if(!s||!l)return;
 selectedCourse={standard:s,level:l};
 const objective=level==='Foundation'?`Understand the main concepts and requirements of ${systemPhrase(s)}.`:level==='Lead Implementer'?`Develop your knowledge of planning, implementing and maintaining ${systemPhrase(s)}.`:`Develop your knowledge of planning and conducting audits of ${systemPhrase(s)}.`;
 const audience=level==='Foundation'?'Professionals who want an introduction to the standard and its main management system concepts.':level==='Lead Implementer'?'Professionals responsible for implementing or managing the system, and consultants supporting that work.':'Professionals working in audit, assurance or management system conformity assessment.';
 $('#course-detail').innerHTML=`<p class="eyebrow dark">${s.code} / PECB TRAINING</p><h2 id="detail-title">${l.name}<br>${s.title}</h2><p class="detail-subtitle">${l.days}-day course structure · Self-paced online · Prices in ${market==='AU'?'AUD':'MYR'}</p><div class="detail-price"><span>Listed course fee</span><strong>${l[market]}</strong></div><p>${objective}</p><h3>Areas of focus</h3><ul>${s.focus.map(f=>`<li>${f}</li>`).join('')}</ul><h3>Who this course is for</h3><p>${audience}</p><p class="detail-disclaimer">Enquire about course entry requirements and package details. Certification is subject to PECB’s examination and credential requirements.</p><a class="button" href="/contact/?${new URLSearchParams({interest:s.code+' '+s.title,level:l.name,market}).toString()}">Enquire about this course ↗</a>`;
 $('#course-dialog').showModal();
}
document.addEventListener('click',e=>{
 const marketButton=e.target.closest('[data-market]');if(marketButton)setMarket(marketButton.dataset.market);
 const levelButton=e.target.closest('[data-level]');if(levelButton){activeLevel=levelButton.dataset.level;document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b===levelButton)));renderCourses()}
 const courseButton=e.target.closest('[data-course]');if(courseButton)courseDetails(courseButton.dataset.course,courseButton.dataset.courseLevel);
 
 if(e.target.closest('[data-close]'))e.target.closest('dialog').close();

});
$('#form-market')?.addEventListener('change',e=>setMarket(e.target.value));
const navTriggers=[...document.querySelectorAll('.nav-trigger')];
function closeDropdowns(except=null){navTriggers.forEach(trigger=>{if(trigger!==except){trigger.setAttribute('aria-expanded','false');document.getElementById(trigger.getAttribute('aria-controls')).hidden=true;}})}
function setDropdown(trigger,open){closeDropdowns(open?trigger:null);trigger.setAttribute('aria-expanded',String(open));document.getElementById(trigger.getAttribute('aria-controls')).hidden=!open;}
function closeMobileNav(){closeDropdowns();$('#primary-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open navigation');}
navTriggers.forEach(trigger=>{
 trigger.addEventListener('click',()=>setDropdown(trigger,trigger.getAttribute('aria-expanded')!=='true'));
 trigger.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setDropdown(trigger,true);const links=[...document.getElementById(trigger.getAttribute('aria-controls')).querySelectorAll('a')];links[event.key==='ArrowDown'?0:links.length-1].focus();}});
});
$('#menu-toggle').addEventListener('click',()=>{const open=$('#menu-toggle').getAttribute('aria-expanded')!=='true';closeDropdowns();$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#primary-nav').classList.toggle('open',open)});
$('#primary-nav').addEventListener('click',event=>{const link=event.target.closest('a');if(link){if(link.hash.startsWith('#course-')){activeLevel='all';document.querySelectorAll('[data-level]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.level==='all')));renderCourses();}closeMobileNav();}});
$('#primary-nav').addEventListener('keydown',event=>{
 const group=event.target.closest('.nav-dropdown');if(!group)return;
 const trigger=group.querySelector('.nav-trigger');
 if(event.key==='Escape'&&trigger.getAttribute('aria-expanded')==='true'){event.preventDefault();event.stopPropagation();setDropdown(trigger,false);trigger.focus();return;}
 if(!event.target.closest('.nav-panel')||!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
 event.preventDefault();const links=[...group.querySelectorAll('.nav-panel a')],index=links.indexOf(event.target.closest('a'));
 const next=event.key==='Home'?0:event.key==='End'?links.length-1:(index+(event.key==='ArrowDown'?1:-1)+links.length)%links.length;
 links[next].focus();
});
$('#primary-nav').addEventListener('focusout',event=>{if(!$('#primary-nav').contains(event.relatedTarget))closeDropdowns();});
document.addEventListener('click',event=>{if(!event.target.closest('#primary-nav'))closeDropdowns();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const wasOpen=$('#primary-nav').classList.contains('open');closeMobileNav();if(wasOpen)$('#menu-toggle').focus();}});
$('#enquiry-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=`PECB training enquiry — ${f.get('interest')}`;const body=`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nOrganisation: ${f.get('organisation')||'Not provided'}\nPreferred pricing currency: ${f.get('market')==='MY'?'MYR':'AUD'}\nInterest: ${f.get('interest')}\n\nGoals / questions:\n${f.get('message')||'Please send me more information about this training pathway.'}`;$('#open-email').href=`mailto:pecb@thinkrisk.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;$('#email-draft').value=`To: pecb@thinkrisk.com.au\nSubject: ${subject}\n\n${body}`;$('#enquiry-form').hidden=true;$('#email-result').hidden=false;$('#copy-status').textContent='';$('#open-email').focus();});
$('#copy-enquiry')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#email-draft').value);$('#copy-status').textContent='Copied.'}catch{$('#email-draft').focus();$('#email-draft').select();$('#copy-status').textContent='Select and copy the text above.'}});
$('#edit-enquiry')?.addEventListener('click',()=>{$('#email-result').hidden=true;$('#enquiry-form').hidden=false;$('#enquiry-form').elements.name.focus()});
$('#privacy-open').addEventListener('click',()=>$('#privacy-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}}));
$('#year').textContent=new Date().getFullYear();setMarket(market);

const enquiryParameters=new URLSearchParams(window.location.search);
if($('#interest')){
 const interest=enquiryParameters.get('interest');
 if([...$('#interest').options].some(option=>option.value===interest))$('#interest').value=interest;
 const level=enquiryParameters.get('level');
 if(interest&&levels.some(item=>item.name===level)&&standards.some(item=>item.code+' '+item.title===interest))$('#enquiry-form').elements.message.value=`I am interested in the ${interest} ${level} course. Please confirm availability, pricing and inclusions.`;
 const requestedMarket=enquiryParameters.get('market');if(['AU','MY'].includes(requestedMarket))setMarket(requestedMarket);
}
if($('#course-grid')&&window.location.hash.startsWith('#course-')){
 const destination=document.getElementById(window.location.hash.slice(1));if(destination)requestAnimationFrame(()=>destination.scrollIntoView());
}

// Keep the course finder and entry prices aligned with the existing catalogue.
function updateCourseFinder(){
 document.querySelectorAll('[data-from-price]').forEach(node=>node.textContent='From '+levels[0][market]);
 if(!$('#finder-standard'))return;
 const standard=standards.find(item=>item.id===$('#finder-standard').value);
 const level=levels.find(item=>item.name===$('#finder-level').value);
 if(!standard||!level)return;
 $('#finder-title').textContent=standard.code+' '+level.name;
 $('#finder-description').textContent=level.name==='Foundation'?`Understand the main concepts and requirements of ${systemPhrase(standard)}.`:level.name==='Lead Implementer'?`Develop your knowledge of planning, implementing and maintaining ${systemPhrase(standard)}.`:`Develop your knowledge of planning and conducting audits of ${systemPhrase(standard)}.`;
 $('#finder-duration').textContent=level.days+'-day course structure · Self-paced online';
 $('#finder-price').textContent=level[market];
 $('#finder-enquire').href='/contact/?'+new URLSearchParams({interest:standard.code+' '+standard.title,level:level.name,market}).toString();
}
$('#finder-standard')?.addEventListener('change',updateCourseFinder);
$('#finder-level')?.addEventListener('change',updateCourseFinder);
updateCourseFinder();

// Course-level exploration uses the same pathways already in the catalogue.
const pathwayInformation={
 'Foundation':{title:'Start with the fundamentals.',text:'Foundation introduces your chosen standard and its main concepts. A practical starting point when you are exploring a new discipline.'},
 'Lead Implementer':{title:'Build implementation knowledge.',text:'Explore planning, implementing and maintaining a management system. A pathway for professionals who manage a system or support that work.'},
 'Lead Auditor':{title:'Develop your audit perspective.',text:'Explore planning and conducting management system audits. A pathway for professionals working in audit, assurance or conformity assessment.'}
};
document.querySelectorAll('[data-training-pathway]').forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.trainingPathway,information=pathwayInformation[selected];if(!information)return;
 document.querySelectorAll('[data-training-pathway]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 $('#pathway-summary-title').textContent=information.title;
 $('#pathway-summary-text').textContent=information.text;
 $('#pathway-find-course').innerHTML='Find a '+selected+' course <span aria-hidden="true">↗</span>';
 if($('#finder-level')){$('#finder-level').value=selected;updateCourseFinder();}
}));

// Fine-pointer devices get a restrained colour spotlight and physical card response.
// Cards remain fully usable without JavaScript, on touch devices and with reduced motion.
function initialisePointerCards(){
 if(typeof window.matchMedia!=='function'||!window.matchMedia('(hover: hover) and (pointer: fine)').matches||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 document.querySelectorAll('.programme-card,.course-card,.about-list article,.pathway-choice,.home-page-card').forEach(card=>{
  if(card.dataset.pointerReady)return;card.dataset.pointerReady='true';card.classList.add('pointer-card');
  let frame=null,lastEvent=null;
  const reset=()=>{if(frame!==null)cancelAnimationFrame(frame);frame=null;lastEvent=null;card.classList.remove('is-pointer-hovered');['--move-x','--move-y','--tilt-x','--tilt-y','--pointer-x','--pointer-y'].forEach(name=>card.style.removeProperty(name));};
  card.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;card.classList.add('is-pointer-hovered');});
  card.addEventListener('pointermove',event=>{
   if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   lastEvent=event;if(frame!==null)return;
   frame=requestAnimationFrame(()=>{frame=null;if(!lastEvent)return;const rect=card.getBoundingClientRect();if(!rect.width||!rect.height)return;const x=Math.max(0,Math.min(1,(lastEvent.clientX-rect.left)/rect.width)),y=Math.max(0,Math.min(1,(lastEvent.clientY-rect.top)/rect.height));
    card.style.setProperty('--pointer-x',(x*100).toFixed(1)+'%');card.style.setProperty('--pointer-y',(y*100).toFixed(1)+'%');card.style.setProperty('--move-x',((x-.5)*6).toFixed(2)+'px');card.style.setProperty('--move-y',(-5+(y-.5)*4).toFixed(2)+'px');card.style.setProperty('--tilt-x',((.5-y)*4).toFixed(2)+'deg');card.style.setProperty('--tilt-y',((x-.5)*4).toFixed(2)+'deg');
   });
  });
  card.addEventListener('pointerleave',reset);card.addEventListener('pointercancel',reset);
 });
}
initialisePointerCards();
if(typeof window.matchMedia==='function'){
 window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change',event=>{if(event.matches)document.querySelectorAll('.pointer-card').forEach(card=>{card.classList.remove('is-pointer-hovered');['--move-x','--move-y','--tilt-x','--tilt-y','--pointer-x','--pointer-y'].forEach(name=>card.style.removeProperty(name));});else initialisePointerCards();});
}

// Animate visible sections once; keep all content visible when observers are unavailable.
if(typeof window.matchMedia==='function'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&typeof IntersectionObserver==='function'){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}),{threshold:.1,rootMargin:'0px 0px -24px 0px'});
 document.querySelectorAll('.client-section-heading,.finder-intro,.client-team-layout,.editorial-heading,.section-heading,.journey-grid article,.process-grid article,.focus-rows article,.page-cta .container').forEach((element,index)=>{element.classList.add('scroll-reveal','reveal-pending');element.style.setProperty('--reveal-delay',(index%3)*65+'ms');observer.observe(element);});
}
const pathwayTrack=document.querySelector('.pathway-track');
if(pathwayTrack){
 if(typeof IntersectionObserver==='function'){const pathObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');pathObserver.unobserve(entry.target);}}),{threshold:.2});pathObserver.observe(pathwayTrack);}else pathwayTrack.classList.add('is-visible');
}
if($('#scroll-progress')&&document.documentElement){
 let scrollFrame=null;
 const updateProgress=()=>{scrollFrame=null;const max=document.documentElement.scrollHeight-window.innerHeight,progress=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;$('#scroll-progress').style.transform='scaleX('+progress+')';};
 window.addEventListener('scroll',()=>{if(scrollFrame===null)scrollFrame=requestAnimationFrame(updateProgress);},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
}
