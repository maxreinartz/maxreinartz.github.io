var clickEffect = function (x, y, numParticles) {
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
    };
    particles.push(particle);
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

function createParticles(e, numParticles) {
  var particles = clickEffect(e.clientX + window.scrollX, e.clientY + window.scrollY, numParticles);
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

    var interval = setInterval(function () {
      particle.x += particle.speed.x;
      particle.y += particle.speed.y;
      particle.speed.y += particle.gravity;
      particle.rotation += particle.rotationSpeed;
      particle.opacity -= 0.02;

      div.style.left = particle.x + "px";
      div.style.top = particle.y + "px";
      div.style.opacity = particle.opacity;
      div.style.transform = `rotate(${particle.rotation}deg)`;

      if (particle.opacity <= 0) {
        clearInterval(interval);
        div.remove();
      }
    }, 16);
  });
}