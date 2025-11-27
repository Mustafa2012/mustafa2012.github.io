document.addEventListener("DOMContentLoaded", () => {
  type();
  initBackground();
  initTheme();
  initAltLayout();
});

const btn = document.getElementById("shooting-star-btn");

function updateButtonText() {
  if (document.body.classList.contains("light-mode")) {
    btn.textContent = "🌠 Launch Shooting Star";
  } else if (document.body.classList.contains("alt-mode")) {
    btn.textContent = "✨ Summon Photon";
  } else {
    btn.textContent = "☄️ Hurl Comet";
  }
}

btn.addEventListener("mouseenter", () => {
  btn.textContent = "Launch";
});

btn.addEventListener("mouseleave", updateButtonText);


document.addEventListener("DOMContentLoaded", updateButtonText);


  let dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

   
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
  });

document.getElementById("free-gpu-btn").addEventListener("click", () => {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
});




const typeText = ["I am a middle school student with a love for technology"];
let typeIndex = 0, charIndex = 0;
const typeElem = document.getElementById("typewriter");

function type() {
  if (charIndex < typeText[typeIndex].length) {
    typeElem.textContent += typeText[typeIndex][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => erase(), 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typeElem.textContent = typeText[typeIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    typeIndex = (typeIndex + 1) % typeText.length;
    setTimeout(type, 300);
  }
}

const explosions = [];

function initBackground() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const stars = [];
  const shootingStars = [];

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random(),
      fadeDirection: Math.random() > 0.5 ? 1 : -1
    });
  }

  function getStarColor() {
    if (document.body.classList.contains("light-mode")) return "#444";
    if (document.body.classList.contains("alt-mode")) return "#ffd6f6";
    return "#fff";
  }

  function drawStars() {
    const color = getStarColor();
    for (let star of stars) {
      star.opacity += 0.005 * star.fadeDirection;
      if (star.opacity <= 0 || star.opacity >= 1) star.fadeDirection *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color === "#fff" ? "255,255,255" : "68,68,68"}, ${star.opacity})`;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }           
  }

  function drawShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.trail.unshift({ x: s.x, y: s.y });
      if (s.trail.length > 20) s.trail.pop();

      ctx.beginPath();
      for (let j = 0; j < s.trail.length; j++) {
        const t = s.trail[j];
        ctx.fillStyle = `rgba(255, ${150 - j * 5}, 0, ${1 - j / 20})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, s.size * (1 - j / 20), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = "orange";
      ctx.fill();

      s.x += s.vx;
      s.y += s.vy;

     if (s.x > canvas.width || s.y > canvas.height) {
  for (let j = 0; j < 25; j++) {
    explosions.push({
      x: s.x,
      y: s.y,
      vx: Math.random() * 6 - 3,
      vy: Math.random() * 6 - 3,
      life: 30,
      size: 2 + Math.random() * 2,
      color: `rgb(209, 85, 54)`
    });
  }
  shootingStars.splice(i, 1);
}

    }
  }

  function drawExplosions() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    const p = explosions[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;

    if (p.life <= 0) {
      explosions.splice(i, 1);
    }
  }
}


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawShootingStars();
    requestAnimationFrame(animate);
    drawExplosions();
  }

  animate();

  
  const btn = document.getElementById("shooting-star-btn");
  btn.addEventListener("click", () => {
    shootingStars.push({
      x: Math.random() * canvas.width * 0.5,
      y: Math.random() * canvas.height * 0.2,
      vx: 8 + Math.random() * 3,
      vy: 6 + Math.random() * 2,
      size: 6,
      trail: []
    });
  });
}




document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const { offsetX, offsetY, target } = e;
    const rotateY = (offsetX / target.clientWidth - 0.5) * 10;
    const rotateX = (offsetY / target.clientHeight - 0.5) * -10;
    target.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  card.addEventListener('mouseleave', e => {
    e.target.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
});

/* --------------------- Theme system --------------------- */
function initTheme(){
  const select = document.getElementById('theme-select');
  if(!select) return; // nothing to do if selector missing

  const saved = localStorage.getItem('theme') || 'dark';
  select.value = saved;
  applyTheme(saved);

  select.addEventListener('change', (e) => {
    const t = e.target.value;
    localStorage.setItem('theme', t);
    applyTheme(t);
  });
}

function applyTheme(theme){
  document.body.classList.remove('light-mode','alt-mode');
  if(theme === 'light') document.body.classList.add('light-mode');
  // reflect in UI text and visuals
  updateButtonText();
}

/* alternate layout control (left-side switch) */
function initAltLayout(){
  const toggle = document.getElementById('alt-layout-toggle');
  if(!toggle) return;

  const saved = localStorage.getItem('altLayout') === 'true';
  toggle.checked = !!saved;
  applyAlt(!!saved);
  if(saved) { buildDesktopApps(); updateClock(); }

  toggle.addEventListener('change', (e) => {
    const on = e.target.checked;
    localStorage.setItem('altLayout', on ? 'true' : 'false');
    applyAlt(on);
    if(on) { buildDesktopApps(); updateClock(); }
  });
}

// Reset UI removed (control deleted) — users can toggle Alternate Mode off via top-left control

function applyAlt(on){
  if(on) document.body.classList.add('alt-mode');
  else document.body.classList.remove('alt-mode');
  updateButtonText();
  // hide/cleanup windows when toggling off
  if(!on){
    const windowsRoot = document.getElementById('desktop-windows');
    if(windowsRoot) windowsRoot.innerHTML = '';
  }
}

/* ---------------- Desktop app logic ---------------- */
let __desktopBuilt = false;
let __zCounter = 1500;
let __clockInterval = null;

function buildDesktopApps(){
  if(__desktopBuilt) return;
  __desktopBuilt = true;

  const desktop = document.getElementById('desktop');
  const desktopArea = document.getElementById('desktop-area');
  const dock = document.getElementById('desktop-dock');
  const windowsRoot = document.getElementById('desktop-windows');
  if(!desktopArea || !dock || !windowsRoot) return;

  // Build generic app icons (no personal/project details)
  const projects = document.querySelectorAll('.project-card');
  projects.forEach((p, idx) => {
    // create neutral app title (no personal/project text)
    const appTitle = `App ${idx + 1}`;
    const imgElem = p.querySelector('.project-image');
    const imgSrc = imgElem ? (imgElem.src || '') : '';

    // create icon
    const icon = document.createElement('div');
    icon.className = 'app-icon';
    icon.setAttribute('role','button');
    icon.setAttribute('tabindex','0');
    icon.dataset.projectIndex = idx;
    icon.innerHTML = `\n      <div class="icon-img">${imgSrc ? `<img src="${imgSrc}" alt="${appTitle}" style="width:100%;height:100%;border-radius:10px;object-fit:cover;">` : '<div style="width:100%;height:100%;background:linear-gradient(90deg,#3b3b3b,#1a1a1a);border-radius:8px"></div>'}</div>`;

    // click/enter opens the app window
    icon.addEventListener('click', () => openAppWindow(idx, p));
    icon.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { openAppWindow(idx, p); e.preventDefault(); } });

    desktopArea.appendChild(icon);

    // Add to dock quick-launch as well (a compact icon)
    const dockIcon = document.createElement('div');
    dockIcon.className = 'dock-icon';
    dockIcon.title = '';
    dockIcon.innerHTML = imgSrc ? `<img src="${imgSrc}" alt="" style="width:80%;height:80%;object-fit:cover;border-radius:8px">` : `<span></span>`;
    dockIcon.addEventListener('click', () => openAppWindow(idx, p));
    dock.appendChild(dockIcon);
  });

  // small helper: bring window to front
  function focusWindow(win){
    __zCounter += 1;
    win.style.zIndex = __zCounter;
    document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused'));
    win.classList.add('focused');
  }

  // create a window element when opening
  function openAppWindow(index, projectCard){
    // ensure we have a project content to show
    const title = `App ${index + 1}`;

    // window container
    const win = document.createElement('div');
    win.className = 'app-window';
    win.style.left = `${120 + (index * 24) % 300}px`;
    win.style.top = `${60 + (index * 14) % 180}px`;
    win.style.zIndex = (++__zCounter);

    win.innerHTML = `
      <div class="win-header" role="toolbar" aria-label="${title} window controls">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="win-icon" style="width:36px;height:36px;border-radius:8px;overflow:hidden">${projectCard.querySelector('.project-image') ? projectCard.querySelector('.project-image').outerHTML : ''}</div>
          <div class="win-title">${title}</div>
        </div>
        <div class="win-controls">
          <button class="win-close btn-close" title="Close"></button>
          <button class="win-min btn-min" title="Minimize"></button>
          <button class="win-toggle btn-toggle" title="Maximize"></button>
        </div>
      </div>
      <div class="win-body"></div>
    `;

    // populate the window with a neutral mock app interface (no personal details)
    const bodyContainer = win.querySelector('.win-body');
    bodyContainer.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:8px;height:100%;">
        <div style="height:120px;background:linear-gradient(90deg,rgba(255,255,255,0.02),rgba(0,0,0,0.05));border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:700;">${title} — Welcome</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <div style="width:110px;height:110px;border-radius:8px;background:linear-gradient(135deg,#222,#0c0c24);box-shadow:inset 0 5px 12px rgba(255,255,255,0.02);"></div>
          <div style="flex:1;background:linear-gradient(180deg,rgba(0,0,0,0.02),rgba(255,255,255,0.01));border-radius:8px;padding:12px;color:var(--muted);font-size:0.9rem">This is a self-contained app window — intentionally contains no personal information.</div>
        </div>
        <div style="margin-top:auto;color:var(--muted);font-size:0.8rem">Tip: drag the window by its header — click close to dismiss.</div>
      </div>
    `;

    windowsRoot.appendChild(win);

    // focus
    focusWindow(win);

    // draggable header
    const header = win.querySelector('.win-header');
    let dragging = false, startX=0, startY=0, startLeft=0, startTop=0;
    header.addEventListener('mousedown', (ev)=>{
      dragging = true; startX = ev.clientX; startY = ev.clientY;
      startLeft = parseInt(win.style.left || 100); startTop = parseInt(win.style.top || 80);
      win.style.transition = 'none'; win.style.cursor = 'grabbing';
      focusWindow(win);
      ev.preventDefault();
    });
    document.addEventListener('mousemove', (ev)=>{
      if(!dragging) return; const dx = ev.clientX - startX, dy = ev.clientY - startY;
      win.style.left = `${startLeft + dx}px`; win.style.top = `${startTop + dy}px`;
    });
    document.addEventListener('mouseup', ()=>{ if(dragging){ dragging=false; win.style.cursor='default'; win.style.transition = ''; }});

    // focus on click
    win.addEventListener('mousedown', ()=> focusWindow(win));

    // close/min/max
    const closeBtn = win.querySelector('.win-close');
    const minBtn = win.querySelector('.win-min');
    const toggleBtn = win.querySelector('.win-toggle');

    closeBtn.addEventListener('click', ()=>{ win.remove(); });

    minBtn.addEventListener('click', ()=>{
      win.style.display = 'none';
      // add a restore icon in the dock-space
      const restore = document.createElement('div');
      restore.className = 'restore-icon';
      const img = projectCard.querySelector('.project-image');
      if(img){ restore.innerHTML = `<img src="${img.src}" alt="restore">`; }
      // restore on click
      restore.addEventListener('click', ()=>{ win.style.display = 'flex'; restore.remove(); focusWindow(win); });
      dock.querySelector('.dock-space').appendChild(restore);
    });

    toggleBtn.addEventListener('click', ()=>{ win.classList.toggle('maximized'); focusWindow(win); });
  }

  // expose for debugging
  window.openAppWindow = openAppWindow;
}

/* desktop status helpers (clock) */
function updateClock(){
  const el = document.getElementById('desktop-clock');
  if(!el) return;
  if(__clockInterval) clearInterval(__clockInterval);
  function tick(){
    const d = new Date();
    el.textContent = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }
  tick();
  __clockInterval = setInterval(tick, 1000);
}


