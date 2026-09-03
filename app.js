const slides = Array.from(document.querySelectorAll('.slide'));
const current = document.getElementById('current');
let index = 0;
function show(i, push=true){
  index = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((slide,n)=>slide.classList.toggle('active', n===index));
  current.textContent = String(index+1).padStart(2,'0');
  document.title = `${String(index+1).padStart(2,'0')} · ${slides[index].dataset.title} | Muhammad Ahmad Viva`;
  if(push) history.replaceState(null, '', `#${index+1}`);
  document.querySelectorAll('video').forEach(v => { if(!slides[index].contains(v)) v.pause(); });
}
function next(){ show(index+1); }
function prev(){ show(index-1); }
document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', next));
document.getElementById('fullscreenBtn').addEventListener('click',()=>{
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});
window.addEventListener('keydown', e => {
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){ e.preventDefault(); next(); }
  if(['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(e.key)){ e.preventDefault(); prev(); }
  if(e.key.toLowerCase()==='f') document.getElementById('fullscreenBtn').click();
});
let touchX=0, touchY=0;
window.addEventListener('touchstart', e=>{touchX=e.touches[0].clientX; touchY=e.touches[0].clientY;},{passive:true});
window.addEventListener('touchend', e=>{
  const dx=e.changedTouches[0].clientX-touchX, dy=e.changedTouches[0].clientY-touchY;
  if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)) dx<0?next():prev();
},{passive:true});
window.addEventListener('hashchange',()=>{
  const num = parseInt(location.hash.replace('#',''),10);
  if(num) show(num-1,false);
});
const initial = parseInt(location.hash.replace('#',''),10);
show(initial ? initial-1 : 0, false);
// Professional lightweight 3D hover, disabled on touch/small screens.
if(matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.tilt,.cards article,.workflow-line article,.growth-grid article').forEach(el=>{
    el.addEventListener('pointermove', e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform='';});
  });
}
