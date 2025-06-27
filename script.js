document.addEventListener("DOMContentLoaded", () => {
  type();
  initBackground();
});

const btn = document.getElementById("shooting-star-btn");

function updateButtonText() {
  if (document.body.classList.contains("light-mode")) {
    btn.textContent = "Launch Shooting Star";
  } else {
    btn.textContent = "Hurl Comet";
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
    return document.body.classList.contains("light-mode") ? "#444" : "#fff";
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

