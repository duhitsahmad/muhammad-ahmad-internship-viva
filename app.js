const slides = [...document.querySelectorAll('.slide')];
const current = document.querySelector('#currentSlide');
const total = document.querySelector('#totalSlides');
const bar = document.querySelector('#progressBar');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const fullBtn = document.querySelector('#fullscreenBtn');
const railBtns = [...document.querySelectorAll('.rail button')];
let index = 0;

total.textContent = `/ ${slides.length}`;

function setSlide(i, pushHash = true){
  index = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s,n)=>s.classList.toggle('active', n === index));
  current.textContent = String(index + 1).padStart(2,'0');
  bar.style.width = `${((index + 1) / slides.length) * 100}%`;
  document.title = `${String(index + 1).padStart(2,'0')} · ${slides[index].dataset.title} | Muhammad Ahmad Viva`;
  railBtns.forEach(btn => btn.classList.toggle('active', Number(btn.dataset.goto) === index));
  document.querySelectorAll('video').forEach(v => { if(!slides[index].contains(v)) v.pause(); });
  if(pushHash) history.replaceState(null, '', `#slide-${index + 1}`);
}
function next(){ setSlide(index + 1); }
function prev(){ setSlide(index - 1); }

prevBtn.addEventListener('click', prev); nextBtn.addEventListener('click', next);
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click', next));
railBtns.forEach(btn=>btn.addEventListener('click', ()=>setSlide(Number(btn.dataset.goto))));
fullBtn.addEventListener('click', ()=>{ if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); });
window.addEventListener('keydown', e=>{
  const tag = document.activeElement?.tagName?.toLowerCase(); if(tag === 'input' || tag === 'textarea') return;
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();next();}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev();}
  if(e.key.toLowerCase()==='f') fullBtn.click();
});

let touchX = null;
window.addEventListener('touchstart', e=>{touchX = e.touches[0].clientX;},{passive:true});
window.addEventListener('touchend', e=>{
  if(touchX === null) return; const diff = e.changedTouches[0].clientX - touchX;
  if(Math.abs(diff)>55) diff<0 ? next() : prev(); touchX = null;
},{passive:true});

const hash = location.hash.match(/slide-(\d+)/); if(hash) index = Number(hash[1]) - 1; setSlide(index, false);

// Premium 3D tilt for cards/images.
document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});

// Starfield canvas to match the portfolio's cyber/AI atmosphere without external libraries.
const canvas = document.querySelector('#starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resize(){
  canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars = Array.from({length: Math.min(160, Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.35+.25,s:Math.random()*.35+.05,a:Math.random()*.75+.2}));
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const st of stars){
    st.y += st.s; if(st.y > innerHeight) { st.y = -2; st.x = Math.random()*innerWidth; }
    ctx.globalAlpha = st.a; ctx.fillStyle = Math.random()>.08 ? '#8feaff' : '#f7a53b';
    ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(animate);
}
addEventListener('resize', resize); resize(); animate();


// Theme picker: matches the portfolio look while giving quick color switching.
const themeBtn = document.querySelector('#themeBtn');
const themeMenu = document.querySelector('#themeMenu');
const themePicker = document.querySelector('.theme-picker');
const themeButtons = [...document.querySelectorAll('[data-theme]')];
const savedTheme = localStorage.getItem('viva-theme') || 'cyber';
function applyTheme(name){
  document.body.dataset.theme = name;
  localStorage.setItem('viva-theme', name);
  themeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === name));
}
applyTheme(savedTheme);
themeBtn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = themePicker.classList.toggle('open');
  themeBtn.setAttribute('aria-expanded', String(open));
});
themeButtons.forEach(btn=>btn.addEventListener('click', ()=>{
  applyTheme(btn.dataset.theme);
  themePicker.classList.remove('open');
  themeBtn?.setAttribute('aria-expanded','false');
}));
document.addEventListener('click', (e)=>{
  if(themePicker && !themePicker.contains(e.target)){
    themePicker.classList.remove('open');
    themeBtn?.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('keydown', e=>{
  if(e.key.toLowerCase()==='t'){
    const order=['cyber','ocean','bright','sunset'];
    const currentTheme=document.body.dataset.theme || 'cyber';
    applyTheme(order[(order.indexOf(currentTheme)+1)%order.length]);
  }
});
