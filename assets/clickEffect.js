var clickEffect = function (x, y, numParticles, duration) {
  var particles = [];

  var colors = [
    getComputedStyle(document.documentElement).getPropertyValue('--dot1-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--dot2-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--dot3-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--dot4-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--dot5-color').trim()
  ];

  for (var i = 0; i < numParticles; i++) {
    var particle = {
      x: x,
      y: y,
      width: Math.random() * 5 + 5,
      height: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: {
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 - 2,
      },
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      opacity: 1,
      gravity: 0.05,
      duration: duration || 1,
      startTime: Date.now(),
    };
    particles.push(particle);

    // Debugging: Print initial properties
    console.log(`[DEBUG] Initial particle properties: ${JSON.stringify(particle)}`);
  }

  return particles;
};

var isMouseDown = false;

document.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  createParticles(e, 10);
});

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

document.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    createParticles(e, 2);
  }
});

function createParticles(e, numParticles, duration) {
  var particles = clickEffect(e.clientX + window.scrollX, e.clientY + window.scrollY, numParticles, duration);
  particles.forEach(function (particle) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = particle.width + "px";
    div.style.height = particle.height + "px";
    div.style.backgroundColor = particle.color;
    div.style.left = particle.x + "px";
    div.style.top = particle.y + "px";
    div.style.opacity = particle.opacity;
    div.style.transform = `rotate(${particle.rotation}deg)`;
    div.style.pointerEvents = "none";
    document.body.appendChild(div);
    particle.div = div;
    activeParticles.push(particle);
  });
}

function animateParticles() {
  var currentTime = Date.now();
  var deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  activeParticles.forEach(function (particle) {
    var elapsedTime = currentTime - particle.startTime;

    if (elapsedTime < particle.duration * 1000) {
      particle.x += particle.speed.x * (deltaTime / 16);
      particle.y += particle.speed.y * (deltaTime / 16);
      particle.speed.y += particle.gravity * (deltaTime / 16);
      particle.rotation += particle.rotationSpeed * (deltaTime / 16);
      particle.opacity -= (1 / (particle.duration * 1000)) * deltaTime;

      particle.div.style.left = particle.x + "px";
      particle.div.style.top = particle.y + "px";
      particle.div.style.opacity = particle.opacity;
      particle.div.style.transform = `rotate(${particle.rotation}deg)`;
    } else {
      particle.div.remove();
      activeParticles = activeParticles.filter(p => p !== particle);
    }
  });

  requestAnimationFrame(animateParticles);
}

var activeParticles = [];
var lastTime = Date.now();
requestAnimationFrame(animateParticles);

function startConfetti() {
  console.log("[DEBUG] Starting confetti.");
  var confettiInterval = setInterval(function () {
    createParticles(
      {
        clientX: Math.random() * window.innerWidth,
        clientY: Math.random() * window.innerHeight,
      },
      2,
      3
    );
  }, 250);
}

window.startConfetti = startConfetti;