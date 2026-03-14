// script.js — Mazge v2

// ---------- Typewriter ----------
const texts = ["movyra.com.tr", "guns.lol/troxwway"];
const typeEl = document.getElementById('typewriter');
let txtIndex = 0, charIndex = 0, deleting = false;
const TYPING_SPEED = 90, DELETING_SPEED = 40, PAUSE_AFTER = 1400;

function typeLoop(){
  const current = texts[txtIndex];
  if(!deleting){
    typeEl.textContent = current.slice(0, ++charIndex);
    if(charIndex === current.length){ deleting = true; setTimeout(typeLoop, PAUSE_AFTER); return; }
    setTimeout(typeLoop, TYPING_SPEED);
  } else {
    typeEl.textContent = current.slice(0, --charIndex);
    if(charIndex === 0){ deleting = false; txtIndex = (txtIndex + 1) % texts.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, DELETING_SPEED);
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  if(typeEl) typeLoop();
  initRainCanvas();
  initTilt();
  initDiscordCopy();
  initButtonFeedback();
});

// ---------- Button click feedback ----------
function initButtonFeedback(){
  document.querySelectorAll('.action-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.animate([
        { transform: 'translateY(-6px)' },
        { transform: 'translateY(-4px) scale(1.01)' },
        { transform: 'translateY(-6px)' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1)'});
    });
  });
}

// ---------- Discord Copy ----------
function initDiscordCopy(){
  const btn = document.getElementById('discord-copy-btn');
  const iconCopy = document.getElementById('icon-copy');
  const iconCheck = document.getElementById('icon-check');
  if(!btn) return;

  function doCopy(){
    navigator.clipboard.writeText('vhros').then(()=>{
      btn.classList.add('copied');
      iconCopy.style.display = 'none';
      iconCheck.style.display = 'block';
      // Flash animation on the name
      const nameEl = document.getElementById('discord-name-text');
      if(nameEl){
        nameEl.style.color = '#4ade80';
        nameEl.style.transition = 'color 0.3s';
      }
      setTimeout(()=>{
        btn.classList.remove('copied');
        iconCopy.style.display = 'block';
        iconCheck.style.display = 'none';
        if(nameEl) nameEl.style.color = '';
      }, 2200);
    }).catch(()=>{
      // fallback
      const ta = document.createElement('textarea');
      ta.value = 'vhros';
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  }

  btn.addEventListener('click', doCopy);
  btn.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') doCopy(); });
}

// ======================
// Enhanced Tilt — corner tracking with glow
// ======================
function initTilt(){
  if(('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;
  const card = document.getElementById('profile-card');
  if(!card || card.dataset.tiltInited) return;
  card.dataset.tiltInited = '1';

  const maxTilt = 10;
  const lerp = 0.10;
  const idleStopMs = 600;

  let rect = null;
  let targetX = 0, targetY = 0;
  let curX = 0, curY = 0;
  let rafId = null;
  let idleTimer = null;
  let running = false;

  function updateRect(){ rect = card.getBoundingClientRect(); }

  function onEnter(){ updateRect(); startLoop(); clearTimeout(idleTimer); }

  function onMove(e){
    if(!rect) updateRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if(x < 0 || x > 1 || y < 0 || y > 1) return;

    const nx = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, (y - 0.5) * 2));
    targetY = nx * maxTilt;
    targetX = -ny * maxTilt;

    // Update CSS variables for corner glow
    card.style.setProperty('--mx', (x * 100) + '%');
    card.style.setProperty('--my', (y * 100) + '%');

    startLoop();
    clearTimeout(idleTimer);
  }

  function onLeave(){
    targetX = 0; targetY = 0;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(stopLoop, idleStopMs);
  }

  function apply(rx, ry){
    // Corner-aware shadow: shadow follows the opposite of tilt direction
    const shadowX = -ry * 3;
    const shadowY = rx * 3;
    const spread = Math.abs(rx) + Math.abs(ry);
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    card.style.boxShadow = `${shadowX}px ${shadowY}px ${60 + spread * 2}px rgba(0,0,0,0.45), 0 0 ${30 + spread * 4}px rgba(168,85,247,${0.05 + spread * 0.008})`;
  }

  function loop(){
    curX += (targetX - curX) * lerp;
    curY += (targetY - curY) * lerp;
    if(Math.abs(curX) < 0.01) curX = 0;
    if(Math.abs(curY) < 0.01) curY = 0;
    apply(curX, curY);
    if(Math.abs(curX - targetX) > 0.001 || Math.abs(curY - targetY) > 0.001){
      rafId = requestAnimationFrame(loop);
      running = true;
    } else {
      running = false;
      if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    }
  }

  function startLoop(){
    if(!running){ running = true; if(rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop); }
  }

  function stopLoop(){
    if(rafId) cancelAnimationFrame(rafId);
    rafId = null; running = false;
    card.style.transition = 'transform 520ms cubic-bezier(.2,.9,.3,1), box-shadow 520ms';
    apply(0,0);
    setTimeout(()=> card.style.transition = '', 540);
  }

  card.addEventListener('pointerenter', onEnter);
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerleave', onLeave);
  window.addEventListener('resize', updateRect);
  updateRect();
}

// ======================
// Rain Canvas
// ======================
function initRainCanvas(){
  const canvas = document.getElementById('bg-snow');
  if(!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.min(1.5, window.devicePixelRatio || 1);
  let w = 0, h = 0, particles = [];
  const BASE_DENSITY = 0.00006, MAX_PARTICLES = 120, SPEED_MULT = 1.6;

  function resize(){
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(MAX_PARTICLES, Math.max(22, Math.floor(w * h * BASE_DENSITY)));
    initParticles(count);
  }

  function rand(a,b){ return Math.random()*(b-a)+a; }

  function createParticle(){
    const angle = rand(210,235) * (Math.PI/180);
    const speed = rand(10,30) * SPEED_MULT;
    return { x: rand(0,w), y: rand(-h*0.35, h*0.12),
      vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
      len: rand(18,44), thickness: rand(1,2.4), alpha: rand(0.09,0.28) };
  }

  function initParticles(n){ particles.length=0; for(let i=0;i<n;i++) particles.push(createParticle()); }

  let last = performance.now();
  function frame(now){
    const dt = Math.min(40, now - last); last = now;
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for(let p of particles){
      const delta = dt/16.67;
      p.x += p.vx*delta; p.y += p.vy*delta;
      if(p.y > h+60 || p.x < -80 || p.x > w+80){
        Object.assign(p, createParticle()); p.y = rand(-h*0.25,-10); p.x = rand(0,w);
      }
      ctx.strokeStyle = `rgba(200,150,255,${Math.min(1,p.alpha)})`;
      ctx.lineWidth = p.thickness;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx*0.02*p.len, p.y - p.vy*0.02*p.len);
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
}
