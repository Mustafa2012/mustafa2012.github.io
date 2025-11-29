document.addEventListener("DOMContentLoaded", () => {
  type();
  initBackground();
  initTheme();
  initAltLayout();
  
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

  
  if(dot){
    
    document.addEventListener('mousedown', ()=> dot.classList.add('cursor-press'));
    document.addEventListener('mouseup', ()=> dot.classList.remove('cursor-press'));


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
  if(!select) return; 

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



function applyAlt(on){
  if(on) document.body.classList.add('alt-mode');
  else document.body.classList.remove('alt-mode');
  updateButtonText();

  if(!on){
    const windowsRoot = document.getElementById('desktop-windows');
    if(windowsRoot) windowsRoot.innerHTML = '';
  }
}

/* ---------------- Desktop app logic ---------------- */
let __desktopBuilt = false;
let __zCounter = 1500;
let __clockInterval = null;


function getDockRoot(){ return document.getElementById('desktop-dock-inner'); }
function addToDock(win, title, imgSrc){
  const dockRoot = getDockRoot(); if(!dockRoot) return null;
  const id = win.dataset.winId || `win-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  win.dataset.winId = id;
  if(dockRoot.querySelector(`.dock-item[data-win-id="${id}"]`)) return null;
  const entry = document.createElement('div');
  entry.className = 'dock-item'; entry.dataset.winId = id;
  entry.innerHTML = `<img src="${imgSrc || ''}" alt="${title}"><div class="dock-label">${title}</div>`;
  
  entry.style.opacity = '0';
  entry.addEventListener('click', ()=>{
    const w = document.querySelector(`.app-window[data-win-id="${id}"]`);
    if(w){
      
      restoreWindowFromDock(w, entry);
    }
  });
  dockRoot.appendChild(entry);
  return entry;
}


function animateMinimizeToDock(win, title, imgSrc){
  if(!win) return;
  const entry = addToDock(win, title, imgSrc);
  if(!entry) {
    
    win.style.display = 'none';
    return;
  }

  const img = entry.querySelector('img');

  
  const winRect = win.getBoundingClientRect();
  const dockRect = img ? img.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight-40, width:48, height:48 };

  
  win.dataset.prevLeft = parseInt(win.style.left || winRect.left);
  win.dataset.prevTop = parseInt(win.style.top || winRect.top);

  const winCenterX = winRect.left + winRect.width/2;
  const winCenterY = winRect.top + winRect.height/2;
  const dockCenterX = dockRect.left + dockRect.width/2;
  const dockCenterY = dockRect.top + dockRect.height/2;
  const dx = Math.round(dockCenterX - winCenterX);
  const dy = Math.round(dockCenterY - winCenterY);
  const scale = Math.max(0.12, dockRect.width / winRect.width);

  
  entry.style.opacity = '0';

  
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
    
    entry.style.transition = 'opacity 180ms linear';
    entry.style.opacity = '1';
  }

  win.addEventListener('transitionend', onEnd);
}


function restoreWindowFromDock(win, entry){
  if(!win) { if(entry) entry.remove(); return; }
  
  const img = entry.querySelector('img');

  
  const wasHidden = win.style.display === 'none' || getComputedStyle(win).display === 'none';
  win.style.display = 'flex';
  win.style.visibility = 'hidden';

  
  const winRect = win.getBoundingClientRect();
  const targetLeft = parseInt(win.dataset.prevLeft || winRect.left);
  const targetTop = parseInt(win.dataset.prevTop || winRect.top);

  
  
  const dockRect = img ? img.getBoundingClientRect() : {left: window.innerWidth/2, top: window.innerHeight - 40, width: 48, height:48};
  const dockCenterX = dockRect.left + dockRect.width/2;
  const dockCenterY = dockRect.top + dockRect.height/2;
  const winCenterX = targetLeft + winRect.width/2;
  const winCenterY = targetTop + winRect.height/2;

  const dx = dockCenterX - winCenterX;
  const dy = dockCenterY - winCenterY;
  const scale = Math.max(0.18, (dockRect.width / winRect.width));

  
  win.style.left = targetLeft + 'px';
  win.style.top = targetTop + 'px';
  win.dataset.winId = win.dataset.winId || `win-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;

  
  win.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  win.style.opacity = '0.05';
  win.style.visibility = 'visible';

  
  requestAnimationFrame(()=>{
    
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

  
    
    const appItems = [];

    
    document.querySelectorAll('.project-card').forEach((p, idx) => {
      const title = p.querySelector('.project-title')?.textContent?.trim() || `Project ${idx + 1}`;
      const img = p.querySelector('.project-image');
      const desc = p.querySelector('.project-desc')?.textContent?.trim() || '';
      const tags = Array.from(p.querySelectorAll('.project-tags span') || []).map(s => s.textContent.trim());
      const links = Array.from(p.querySelectorAll('.project-links a') || []).map(a => ({ href: a.href, text: a.textContent.trim(), target: a.target || '', rel: a.rel || '' }));
      appItems.push({ id: `project-${idx}`, type: 'project', title, imgSrc: img ? img.src : '', desc, tags, links, source: p });
    });

    
    document.querySelectorAll('.book-card').forEach((b, idx) => {
      const title = b.querySelector('h3')?.textContent?.trim() || (`Book ${idx+1}`);
      const img = b.querySelector('.book-cover');
      const desc = b.querySelector('p')?.textContent?.trim() || '';
      appItems.push({ id: `book-${idx}`, type: 'book', title, imgSrc: img ? img.src : '', desc, source: b });
    });

    
    document.querySelectorAll('.book-card-square').forEach((b, idx) => {
      const title = b.querySelector('h3')?.textContent?.trim() || (`BookS ${idx+1}`);
      const img = b.querySelector('img');
      const desc = b.querySelector('p')?.textContent?.trim() || '';
      appItems.push({ id: `book-s-${idx}`, type: 'book', title, imgSrc: img ? img.src : '', desc, source: b });
    });

    
    const aboutSection = document.getElementById('about');
    if(aboutSection){
      appItems.push({ id: 'about-app', type: 'about', title: 'About', imgSrc: document.querySelector('.profile-pic')?.src || '', source: aboutSection });
    }

    
    const contact = document.getElementById('contact');
    if(contact){
      const links = Array.from(contact.querySelectorAll('a')).slice(0,3);
      links.forEach((a, i)=>{
        const title = a.title || a.getAttribute('href') || `Contact ${i+1}`;
        appItems.push({ id: `contact-${i}`, type: 'contact', title, imgSrc: '', source: a, links: [{ href: a.href, text: title, target: a.target || '_blank', rel: a.rel || '' }] });
      });
    }

    
    if(appItems.length === 0){
      appItems.push({ id: 'fallback-1', type:'misc', title:'App', imgSrc:'' });
    }

    
    function makeFallbackIcon(title, idx){
      const colors = ['#ff6b6b','#6bffb8','#6bc3ff','#ffd36b','#b58eff','#7df9ff'];
      const c = colors[idx % colors.length];
      const letter = (title || '?').charAt(0).toUpperCase();
      return `<div style="width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg, ${c}cc, ${c}88);color:#111;font-weight:800;font-size:22px;">${letter}</div>`;
    }

    
    function makeIconDraggable(icon, container){
      let dragging = false;
      let startX = 0, startY = 0, startLeft = 0, startTop = 0, pointerId = null;
      icon.addEventListener('pointerdown', (e) => {
        if(e.button !== 0) return; 
        pointerId = e.pointerId;
        icon.setPointerCapture(pointerId);
        const areaRect = container.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        startX = e.clientX; startY = e.clientY;
        startLeft = iconRect.left - areaRect.left; startTop = iconRect.top - areaRect.top;

        

        
        if(getComputedStyle(icon).position !== 'absolute'){
          icon.style.position = 'absolute';
          icon.style.left = `${startLeft}px`;
          icon.style.top = `${startTop}px`;
        }
        icon.style.zIndex = ++__zCounter;

        function onPointerMove(ev){
          const dx = ev.clientX - startX, dy = ev.clientY - startY;
          if(!dragging){ if(Math.abs(dx) > 6 || Math.abs(dy) > 6){ dragging = true; icon.classList.add('dragging'); } else return; }
          const newLeft = Math.max(6, startLeft + dx);
          const newTop = Math.max(6, startTop + dy);
          icon.style.left = `${newLeft}px`;
          icon.style.top = `${newTop}px`;

          
        }

        function onPointerUp(ev){
          icon.releasePointerCapture(pointerId);
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);
          if(dragging){
            
            icon.classList.remove('dragging');
            dragging = false;
          }
        }

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      });
    }

    
    appItems.forEach((item, idx) => {
      const icon = document.createElement('div');
      icon.className = 'app-icon';
      icon.setAttribute('role','button');
      icon.setAttribute('tabindex','0');
      icon.dataset.appId = item.id;

      let innerImgHTML = '';
      if(item.imgSrc){
        innerImgHTML = `<img src="${item.imgSrc}" alt="${item.title}" style="width:100%;height:100%;border-radius:10px;object-fit:cover;">`;
      } else if(item.type === 'contact' && item.source instanceof Element){
        const iconMarkup = item.source.innerHTML || '';
        innerImgHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:12px;background:linear-gradient(180deg,#ffffff,#f0f0f0);font-size:20px;color:#0b444e;">${iconMarkup}</div>`;
      } else {
        innerImgHTML = makeFallbackIcon(item.title, idx);
      }

      icon.innerHTML = `\n      <div class="icon-img">${innerImgHTML}</div>\n      <div class="icon-label">${item.title}</div>`;

      icon.addEventListener('click', () => openAppWindow(item.id, item));
      icon.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { openAppWindow(item.id, item); e.preventDefault(); } });

      desktopArea.appendChild(icon);
    });



  
  function focusWindow(win){
    __zCounter += 1;
    win.style.zIndex = __zCounter;
    document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused'));
    win.classList.add('focused');

    
  }

  

  function openAppWindow(appKey, projectCard){
    
    const existingWin = document.querySelector(`.app-window[data-app-key="${appKey}"]`);
    if(existingWin){
      
      if(getComputedStyle(existingWin).display === 'none'){
        
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

      
      __zCounter += 1;
      existingWin.style.zIndex = __zCounter;
      document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused'));
      existingWin.classList.add('focused');
      return existingWin;
    }
    
    let title = 'App';
    let desc = '';
    let tags = [];
    let links = [];
    let imgSrc = '';

    const isDescriptor = projectCard && typeof projectCard === 'object' && !projectCard.nodeType;
    if(isDescriptor){
      
      if(projectCard.source && projectCard.source.nodeType){
        const src = projectCard.source;
        title = projectCard.title || src.querySelector('.project-title')?.textContent?.trim() || src.querySelector('h3')?.textContent?.trim() || title;
        desc = projectCard.desc || src.querySelector('.project-desc')?.textContent?.trim() || src.querySelector('.book-content p')?.textContent?.trim() || src.querySelector('.book-info p')?.textContent?.trim() || '';
        tags = projectCard.tags || Array.from(src.querySelectorAll('.project-tags span')||[]).map(e=>e.textContent.trim());
        links = projectCard.links || Array.from(src.querySelectorAll('.project-links a')||[]).map(a=>({ href: a.href, text: a.textContent.trim(), target: a.target||'', rel: a.rel||'' }));
        const imgElem = src.querySelector('.project-image') || src.querySelector('.book-cover') || src.querySelector('img');
        imgSrc = projectCard.imgSrc || (imgElem ? (imgElem.src || '') : '');
      } else {
        title = projectCard.title || title;
        desc = projectCard.desc || '';
        tags = projectCard.tags || [];
        links = projectCard.links || [];
        imgSrc = projectCard.imgSrc || '';
      }
    } else {
      title = projectCard?.querySelector('.project-title')?.textContent?.trim() || projectCard?.querySelector('.book-content h3')?.textContent?.trim() || projectCard?.querySelector('.book-info h3')?.textContent?.trim() || projectCard?.querySelector('h3')?.textContent?.trim() || title;
      desc = projectCard?.querySelector('.project-desc')?.textContent?.trim() || projectCard?.querySelector('.book-content p')?.textContent?.trim() || projectCard?.querySelector('.book-info p')?.textContent?.trim() || '';
      tags = Array.from(projectCard?.querySelectorAll('.project-tags span') || []).map(e => e.textContent.trim());
      links = Array.from(projectCard?.querySelectorAll('.project-links a') || []).map(a => ({ href: a.href, text: a.textContent.trim(), target: a.target || '', rel: a.rel || '' }));
      const imgElem = projectCard?.querySelector('.project-image') || projectCard?.querySelector('.book-cover') || projectCard?.querySelector('img');
      imgSrc = imgElem ? (imgElem.src || '') : '';
    }

    
    const win = document.createElement('div');
    win.className = 'app-window';
    
    win.style.left = '50%';
    win.style.top = '50%';
    win.style.transform = 'translate(-50%, -50%)';
    win.style.zIndex = (++__zCounter);
    
    win.dataset.appKey = appKey;

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

    
    const rect = win.getBoundingClientRect();
    let centeredLeft = Math.round((window.innerWidth - rect.width) / 2);
    let centeredTop = Math.round((window.innerHeight - rect.height) / 2);
    const MARGIN = 12;
    centeredLeft = Math.max(MARGIN, centeredLeft);
    centeredTop = Math.max(MARGIN, centeredTop);
    win.style.transform = '';
    win.style.left = centeredLeft + 'px';
    win.style.top = centeredTop + 'px';

    
    focusWindow(win);

    
    

    
    win.addEventListener('mousedown', ()=> focusWindow(win));

    
    const closeBtn = win.querySelector('.win-close');
    const minBtn = win.querySelector('.win-min');
    const toggleBtn = win.querySelector('.win-toggle');

    closeBtn.addEventListener('click', ()=>{ 
      
      removeDockEntryForWin(win);
      win.remove();
    });

    
    minBtn.addEventListener('click', ()=>{
      
      animateMinimizeToDock(win, title, imgSrc);
    });

    toggleBtn.addEventListener('click', ()=>{ win.classList.toggle('maximized'); focusWindow(win); });
  }


  window.openAppWindow = openAppWindow;
}

/* ---------------- About popup (open on load) ---------------- */
function openAboutWindow(){
  try{
    const windowsRoot = document.getElementById('desktop-windows');
    if(!windowsRoot) return;

    
    const existing = document.querySelector('.app-window[data-about="1"]');
    if(existing){ existing.style.display = 'flex'; existing.classList.add('focused'); existing.style.zIndex = ++__zCounter; return; }

    const aboutSection = document.getElementById('about');
    const heroImg = document.querySelector('.profile-pic');

    const win = document.createElement('div');
    win.className = 'app-window';
    win.dataset.about = '1';
    
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
      
      clone.querySelectorAll('a').forEach(a => a.setAttribute('target','_blank'));
      
      if(heroImg){
        
        const left = document.createElement('div');
        left.style.flex = '0 0 160px';
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.justifyContent = 'center';
        
        left.innerHTML = `<div style="width:160px;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);display:flex;align-items:center;justify-content:center;">${heroImg.outerHTML}</div>`;

        const right = document.createElement('div');
        right.className = 'about-content';
        
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

    
    const rect = win.getBoundingClientRect();
    let centeredLeft = Math.round((window.innerWidth - rect.width) / 2);
    let centeredTop = Math.round((window.innerHeight - rect.height) / 2);

    
    const MARGIN = 12;
    centeredLeft = Math.max(MARGIN, centeredLeft);
    centeredTop = Math.max(MARGIN, centeredTop);

    
    win.style.transform = '';
    win.style.left = centeredLeft + 'px';
    win.style.top = centeredTop + 'px';

    
    function focusWindow(win){ __zCounter += 1; win.style.zIndex = __zCounter; document.querySelectorAll('.app-window.focused').forEach(w=>w.classList.remove('focused')); win.classList.add('focused'); }
    focusWindow(win);

    


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


