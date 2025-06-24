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

document.addEventListener("DOMContentLoaded", () => {
  type();
  drawSquares();
});

// Animated green squares background
function drawSquares() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const squares = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 0.5 + 0.2,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let sq of squares) {
      ctx.fillStyle = "rgba(100,255,100,0.3)";
      ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
      sq.y += sq.speed;
      if (sq.y > canvas.height) {
        sq.y = -sq.size;
        sq.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}