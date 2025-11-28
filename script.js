document.addEventListener("DOMContentLoaded", () => {
  type();
  initBackground();
  initTheme();
  initAltLayout();
  // open the About popup immediately on page load
  openAboutWindow();
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

  // add small interactive behavior for the custom cursor (used in alt-mode)
  if(dot){
    // press animations
    document.addEventListener('mousedown', ()=> dot.classList.add('cursor-press'));
    document.addEventListener('mouseup', ()=> dot.classList.remove('cursor-press'));

    // enlarge slightly over interactive elements so users still get affordance
    const interactiveSelector = 'a, button, input, select, textarea, [role="button"], .app-icon';
    document.addEventListener('mouseover', (ev) => {
      if(ev.target.closest && ev.target.closest(interactiveSelector)) dot.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (ev) => {
      if(ev.target.closest && ev.target.closest(interactiveSelector)) dot.classList.remove('cursor-hover');
    });
  }

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

// --- Dock helpers (global) ---
function getDockRoot(){ return document.getElementById('desktop-dock-inner'); }
function addToDock(win, title, imgSrc){
  const dockRoot = getDockRoot(); if(!dockRoot) return null;
  const id = win.dataset.winId || `win-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  win.dataset.winId = id;
  if(dockRoot.querySelector(`.dock-item[data-win-id="${id}"]`)) return null;
  const entry = document.createElement('div');
  entry.className = 'dock-item'; entry.dataset.winId = id;
  entry.innerHTML = `<img src="${imgSrc || ''}" alt="${title}"><div class="dock-label">${title}</div>`;
  // make entry initially invisible so we can animate the window into it
  entry.style.opacity = '0';
  entry.addEventListener('click', ()=>{
    const w = document.querySelector(`.app-window[data-win-id="${id}"]`);
    if(w){
      // animate restore from dock to window
      restoreWindowFromDock(w, entry);
    }
  });
  dockRoot.appendChild(entry);
  return entry;
}

// animate minimize: move a window into the dock entry
function animateMinimizeToDock(win, title, imgSrc){
  if(!win) return;
  const entry = addToDock(win, title, imgSrc);
  if(!entry) {
    // fallback: just hide
    win.style.display = 'none';
    return;
  }

  const img = entry.querySelector('img');

  // measure
  const winRect = win.getBoundingClientRect();
  const dockRect = img ? img.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight-40, width:48, height:48 };

  // store previous position for restoring
  win.dataset.prevLeft = parseInt(win.style.left || winRect.left);
  win.dataset.prevTop = parseInt(win.style.top || winRect.top);

  const winCenterX = winRect.left + winRect.width/2;
  const winCenterY = winRect.top + winRect.height/2;
  const dockCenterX = dockRect.left + dockRect.width/2;
  const dockCenterY = dockRect.top + dockRect.height/2;
  const dx = Math.round(dockCenterX - winCenterX);
  const dy = Math.round(dockCenterY - winCenterY);
  const scale = Math.max(0.12, dockRect.width / winRect.width);

  // make sure entry is invisible (it was created with opacity:0) and then animate window to it
  entry.style.opacity = '0';

  // prepare animation
  win.classList.add('minimizing');
  win.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms linear';
  win.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  win.style.opacity = '0.08';

  function onEnd(e){
    if(e && e.propertyName && e.propertyName !== 'transform') return;
    win.classList.remove('minimizing');
    win.style.display = 'none';
    win.style.transform = '';
    win.style.opacity = '';
    win.removeEventListener('transitionend', onEnd);
    // reveal dock entry after animation
    entry.style.transition = 'opacity 180ms linear';
    entry.style.opacity = '1';
  }

  win.addEventListener('transitionend', onEnd);
}

// animate restore: take a dock entry and the window, animate window expanding from dock to stored position
function restoreWindowFromDock(win, entry){
  if(!win) { if(entry) entry.remove(); return; }
  // remove dock entry after we start restore animation
  const img = entry.querySelector('img');
  // compute bounds
  // make window visible temporarily (hidden) to measure size
  const wasHidden = win.style.display === 'none' || getComputedStyle(win).display === 'none';
  win.style.display = 'flex';
  win.style.visibility = 'hidden';

  // read sizes
  const winRect = win.getBoundingClientRect();
  const targetLeft = parseInt(win.dataset.prevLeft || winRect.left);
  const targetTop = parseInt(win.dataset.prevTop || winRect.top);

  // target final position should be the previous left/top we saved
  // compute dock image center
  const dockRect = img ? img.getBoundingClientRect() : {left: window.innerWidth/2, top: window.innerHeight - 40, width: 48, height:48};
  const dockCenterX = dockRect.left + dockRect.width/2;
  const dockCenterY = dockRect.top + dockRect.height/2;
  const winCenterX = targetLeft + winRect.width/2;
  const winCenterY = targetTop + winRect.height/2;

  const dx = dockCenterX - winCenterX;
  const dy = dockCenterY - winCenterY;
  const scale = Math.max(0.18, (dockRect.width / winRect.width));

  // position window at its final coords for correct transform origin
  win.style.left = targetLeft + 'px';
  win.style.top = targetTop + 'px';
  win.dataset.winId = win.dataset.winId || `win-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;

  // set initial transform so it looks like it's coming from the dock
  win.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  win.style.opacity = '0.05';
  win.style.visibility = 'visible';

  // trigger reflow then animate to identity
  requestAnimationFrame(()=>{
    // mark restoring state
    win.classList.add('restoring');
    win.style.transform = '';
    win.style.opacity = '1';
  });

  function onEnd(e){
    if(e && e.propertyName && e.propertyName !== 'transform') return;
    win.classList.remove('restoring');
    win.style.transform = '';
    win.style.opacity = '';
    win.style.visibility = '';
    entry.remove();
    win.removeEventListener('transitionend', onEnd);
  }
  win.addEventListener('transitionend', onEnd);
}
function removeDockEntryForWin(win){
  const id = win.dataset.winId; if(!id) return; const e = getDockRoot()?.querySelector(`.dock-item[data-win-id="${id}"]`); if(e) e.remove();
}

function buildDesktopApps(){
  if(__desktopBuilt) return;
  __desktopBuilt = true;

  const desktop = document.getElementById('desktop');
  const desktopArea = document.getElementById('desktop-area');
  const windowsRoot = document.getElementById('desktop-windows');
  if(!desktopArea || !windowsRoot) return;

  // Build generic app icons (no personal/project details)
  const projects = document.querySelectorAll('.project-card');
  projects.forEach((p, idx) => {
    // Use project title if available, else fallback
    let appTitle = p.querySelector('.project-title')?.textContent?.trim() || `App ${idx + 1}`;
    const imgElem = p.querySelector('.project-image');
    const imgSrc = imgElem ? (imgElem.src || '') : '';

    // create icon
    const icon = document.createElement('div');
    icon.className = 'app-icon';
    icon.setAttribute('role','button');
    icon.setAttribute('tabindex','0');
    icon.dataset.projectIndex = idx;
    icon.innerHTML = `\n      <div class="icon-img">${imgSrc ? `<img src="${imgSrc}" alt="${appTitle}" style="width:100%;height:100%;border-radius:10px;object-fit:cover;">` : '<div style="width:100%;height:100%;background:linear-gradient(90deg,#3b3b3b,#1a1a1a);border-radius:8px"></div>'}</div>\n      <div class="icon-label">${appTitle}</div>`;

    // click/enter opens the app window
    icon.addEventListener('click', () => openAppWindow(idx, p));
    icon.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { openAppWindow(idx, p); e.preventDefault(); } });

    desktopArea.appendChild(icon);
    // no dock icon created — desktop is privacy/clean (no bottom panel)
  });

  // small helper: bring window to front
  function focusWindow(win){
    __zCounter += 1;
    win.style.zIndex = __zCounter;
    document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused'));
    win.classList.add('focused');

    // (dock helpers moved to global scope)
  }

  // create a window element when opening

  function openAppWindow(index, projectCard){
    // if a window for this project already exists, focus/restore it instead of creating another
    const existingWin = document.querySelector(`.app-window[data-project-index="${index}"]`);
    if(existingWin){
      // if minimized -> restore from dock
      if(getComputedStyle(existingWin).display === 'none'){
        // find corresponding dock entry and animate restore if possible
        const dockRoot = getDockRoot();
        const id = existingWin.dataset.winId;
        const entry = id ? dockRoot?.querySelector(`.dock-item[data-win-id="${id}"]`) : null;
        if(entry){
          restoreWindowFromDock(existingWin, entry);
        } else {
          existingWin.style.display = 'flex';
          existingWin.style.zIndex = ++__zCounter;
          existingWin.classList.add('focused');
        }
        return existingWin;
      }

      // already visible -> bring to front and focus
      __zCounter += 1;
      existingWin.style.zIndex = __zCounter;
      document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused'));
      existingWin.classList.add('focused');
      return existingWin;
    }
    // Use project info for popup
    const title = projectCard.querySelector('.project-title')?.textContent?.trim() || `App ${index + 1}`;
    const desc = projectCard.querySelector('.project-desc')?.textContent?.trim() || '';
    const tags = Array.from(projectCard.querySelectorAll('.project-tags span')).map(e => e.textContent.trim());
    const links = Array.from(projectCard.querySelectorAll('.project-links a')).map(a => ({
      href: a.href,
      text: a.textContent.trim(),
      target: a.target || '',
      rel: a.rel || ''
    }));
    const imgElem = projectCard.querySelector('.project-image');
    const imgSrc = imgElem ? (imgElem.src || '') : '';

    // window container
    const win = document.createElement('div');
    win.className = 'app-window';
    // start centered so the window opens in the middle of the viewport
    win.style.left = '50%';
    win.style.top = '50%';
    win.style.transform = 'translate(-50%, -50%)';
    win.style.zIndex = (++__zCounter);
    // mark window with a project index so only one instance exists for each project
    win.dataset.projectIndex = index;

    win.innerHTML = `
      <div class="win-header" role="toolbar" aria-label="${title} window controls">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="win-icon" style="width:36px;height:36px;border-radius:8px;overflow:hidden">${imgSrc ? `<img src="${imgSrc}" alt="${title}" style="width:100%;height:100%;border-radius:8px;object-fit:cover;">` : ''}</div>
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

    // populate the window with project info
    const bodyContainer = win.querySelector('.win-body');
    bodyContainer.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;height:100%;padding:8px 2px 2px 2px;">
        <div style="display:flex;align-items:flex-start;gap:18px;">
          ${imgSrc ? `<img src="${imgSrc}" alt="${title}" style="width:110px;height:110px;border-radius:12px;object-fit:cover;box-shadow:0 2px 12px rgba(0,0,0,0.10);">` : ''}
          <div style="flex:1;min-width:0;">
            <div style="font-size:1.08rem;font-weight:600;margin-bottom:2px;">${title}</div>
            <div style="font-size:0.93rem;margin-bottom:6px;color:inherit;">${desc}</div>
            ${tags.length ? `<div style="margin-bottom:8px;">${tags.map(t => `<span style='display:inline-block;background:#2a2a2a;color:#b7eaff;font-size:0.75rem;padding:2px 8px;border-radius:8px;margin-right:4px;'>${t}</span>`).join('')}</div>` : ''}
            ${links.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">${links.map(l => `<a href='${l.href}' target='${l.target}' rel='${l.rel}' style='background:#222;color:#7df9ff;font-size:0.85rem;padding:6px 14px;border-radius:8px;text-decoration:none;font-weight:600;transition:background 0.2s;'>${l.text}</a>`).join('')}</div>` : ''}
          </div>
        </div>
      </div>
    `;

    windowsRoot.appendChild(win);

    // after added to DOM, compute accurate centered pixel position and clamp to viewport
    const rect = win.getBoundingClientRect();
    let centeredLeft = Math.round((window.innerWidth - rect.width) / 2);
    let centeredTop = Math.round((window.innerHeight - rect.height) / 2);
    const MARGIN = 12;
    centeredLeft = Math.max(MARGIN, centeredLeft);
    centeredTop = Math.max(MARGIN, centeredTop);
    win.style.transform = '';
    win.style.left = centeredLeft + 'px';
    win.style.top = centeredTop + 'px';

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

    closeBtn.addEventListener('click', ()=>{ 
      // remove any dock entry tied to this window
      removeDockEntryForWin(win);
      win.remove();
    });

    // min => minimize into dock (animated)
    minBtn.addEventListener('click', ()=>{
      // animate into dock
      animateMinimizeToDock(win, title, imgSrc);
    });

    toggleBtn.addEventListener('click', ()=>{ win.classList.toggle('maximized'); focusWindow(win); });
  }

  // expose for debugging
  window.openAppWindow = openAppWindow;
}

/* ---------------- About popup (open on load) ---------------- */
function openAboutWindow(){
  try{
    const windowsRoot = document.getElementById('desktop-windows');
    if(!windowsRoot) return;

    // If there's already an About window open, focus it instead
    const existing = document.querySelector('.app-window[data-about="1"]');
    if(existing){ existing.style.display = 'flex'; existing.classList.add('focused'); existing.style.zIndex = ++__zCounter; return; }

    const aboutSection = document.getElementById('about');
    const heroImg = document.querySelector('.profile-pic');

    const win = document.createElement('div');
    win.className = 'app-window';
    win.dataset.about = '1';
    // start centered using transform so first render places the window near center
    win.style.left = '50%';
    win.style.top = '50%';
    win.style.transform = 'translate(-50%, -50%)';
    win.style.zIndex = (++__zCounter);

    const title = 'About';
    win.classList.add('about-window');
    win.innerHTML = `
      <div class="win-header" role="toolbar" aria-label="About window controls">
        <div style="display:flex;align-items:center;gap:8px">
          <!-- removed small preview thumbnail to keep the About header clean -->
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

    const body = win.querySelector('.win-body');
    if(aboutSection){
      const clone = aboutSection.cloneNode(true);
      // ensure links open new tabs
      clone.querySelectorAll('a').forEach(a => a.setAttribute('target','_blank'));
      // prepend a profile image if available and not part of about
      if(heroImg){
        // create a fixed-width left pane that holds the profile image
        const left = document.createElement('div');
        left.style.flex = '0 0 160px';
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.justifyContent = 'center';
        // keep a clean container and let CSS handle how the image fits inside
        left.innerHTML = `<div style="width:160px;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);display:flex;align-items:center;justify-content:center;">${heroImg.outerHTML}</div>`;

        const right = document.createElement('div');
        right.className = 'about-content';
        // if the about section contains the h2 and content, keep those but remove big headers
        // we strip heavy layout and just move children
        while(clone.childNodes.length) right.appendChild(clone.childNodes[0]);

        body.appendChild(left);
        body.appendChild(right);
      } else {
        const right = document.createElement('div');
        right.className = 'about-content';
        right.appendChild(clone);
        body.appendChild(right);
      }
    } else {
      body.textContent = 'About information is not available.';
    }

    windowsRoot.appendChild(win);

    // compute pixel-accurate centered position after render so dragging math is simpler
    const rect = win.getBoundingClientRect();
    let centeredLeft = Math.round((window.innerWidth - rect.width) / 2);
    let centeredTop = Math.round((window.innerHeight - rect.height) / 2);

    // clamp to a small margin to ensure the window never opens off-screen
    const MARGIN = 12;
    centeredLeft = Math.max(MARGIN, centeredLeft);
    centeredTop = Math.max(MARGIN, centeredTop);

    // remove transform and set explicit pixel positions for consistent dragging/focusing math
    win.style.transform = '';
    win.style.left = centeredLeft + 'px';
    win.style.top = centeredTop + 'px';

    // small helper to focus
    function focusWindow(win){ __zCounter += 1; win.style.zIndex = __zCounter; document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused')); win.classList.add('focused'); }
    focusWindow(win);

    // draggable
    const header = win.querySelector('.win-header');
    let dragging = false, startX=0, startY=0, startLeft=0, startTop=0;
    header.addEventListener('mousedown', (ev)=>{ dragging = true; startX = ev.clientX; startY = ev.clientY; startLeft = parseInt(win.style.left) || 120; startTop = parseInt(win.style.top) || 60; win.style.transition = 'none'; win.style.cursor = 'grabbing'; focusWindow(win); ev.preventDefault(); });
    document.addEventListener('mousemove', (ev)=>{ if(!dragging) return; const dx = ev.clientX - startX, dy = ev.clientY - startY; win.style.left = `${startLeft + dx}px`; win.style.top = `${startTop + dy}px`; });
    document.addEventListener('mouseup', ()=>{ if(dragging){ dragging=false; win.style.cursor='default'; win.style.transition = ''; }});

    // close/min/max handlers
    win.querySelector('.win-close').addEventListener('click', ()=>{ removeDockEntryForWin(win); win.remove(); });
    win.querySelector('.win-min').addEventListener('click', ()=>{ animateMinimizeToDock(win, title, heroImg ? heroImg.src : ''); });
    win.querySelector('.win-toggle').addEventListener('click', ()=>{ 
      // when maximizing, clear left positioning so CSS 'maximized' state can take over cleanly
      const max = win.classList.toggle('maximized');
      if(max){ win.style.left = ''; win.style.top = ''; } 
      focusWindow(win); 
    });

  }catch(e){ console.error('openAboutWindow error', e); }
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


