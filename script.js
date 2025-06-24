document.addEventListener("DOMContentLoaded", () => {
  type();
  initBackground();
});

// Typewriter effect
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

// Animated green block background
function initBackground() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const blocks = [];
  const blockCount = 60;

  for (let i = 0; i < blockCount; i++) {
    blocks.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 15 + 5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
     color: `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.2})` 

    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let block of blocks) {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.size, block.size);

      block.x += block.dx;
      block.y += block.dy;

      if (block.x < 0 || block.x > canvas.width - block.size) block.dx *= -1;
      if (block.y < 0 || block.y > canvas.height - block.size) block.dy *= -1;
    }
    requestAnimationFrame(animate);
  }

  animate();
}
