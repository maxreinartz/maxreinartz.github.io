// Importing required modules
import { getDeviceType, getBrowser } from "./assets/scripts/checkDevice.js";

// DOM elements
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = themeToggle.querySelector(".fa-sun");
const moonIcon = themeToggle.querySelector(".fa-moon");
const scrollButton = document.getElementById("back-to-top");

// * Testing mouse trail. Temporarily disabled because of performance issues.
/*var lastMouseX;
var lastMouseY;

document.onmousemove = function(e) {
  var x = e.pageX;
  var y = e.pageY;

  var dx = x - lastMouseX;
  var dy = y - lastMouseY;
  var distance = Math.sqrt(dx * dx + dy * dy);

  var stepX = dx / distance;
  var stepY = dy / distance;

  for (var i = 0; i < distance; i++) {
    let trail = document.createElement('div');
    trail.style.position = 'absolute';
    trail.style.height = '10px';
    trail.style.width = '10px';
    trail.style.backgroundColor = 'white';
    trail.style.left = (lastMouseX + stepX * i) + 'px';
    trail.style.top = (lastMouseY + stepY * i) + 'px';
    trail.style.filter = 'blur(10px)';
    document.body.appendChild(trail);

    setTimeout(function() {
      document.body.removeChild(trail);
    }, 50);
  }

  lastMouseX = x;
  lastMouseY = y;
};*/

// Function to update theme
function updateTheme(theme) {
  body.className = theme;
  sunIcon.style.display = theme === "dark-mode" ? "inline-block" : "none";
  moonIcon.style.display = theme === "dark-mode" ? "none" : "inline-block";
  body.style.transition = "all 0.3s ease";
}

// On load, set the theme from local storage
window.onload = function () {
  console.log("Device type:", getDeviceType());
  console.log("Browser:", getBrowser());

  const savedTheme = localStorage.getItem("theme") || "light-mode";
  updateTheme(savedTheme);

  const warningBubble = document.getElementById("warning-bubble");
  const continueButton = document.getElementById("continue-button");
  const mainContent = document.querySelector("main");

  if (getDeviceType() != "Desktop") {
    const lastVisit = localStorage.getItem("lastVisit");

    if (lastVisit && new Date().getTime() - lastVisit < 5 * 60 * 1000) {
      mainContent.classList.remove("hide-content");
    } else {
      warningBubble.style.display = "block";
      continueButton.style.display = "block";
      mainContent.classList.add("hide-content");
    }
  }

  continueButton.onclick = function () {
    localStorage.setItem("lastVisit", new Date().getTime());
    mainContent.classList.remove("hide-content");
    warningBubble.style.display = "none";
    continueButton.style.display = "none";
  };
};

// Add event listener for theme toggle
themeToggle.addEventListener("click", function () {
  const newTheme = body.classList.contains("dark-mode")
    ? "light-mode"
    : "dark-mode";
  updateTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Check for scroll event and show/hide the back-to-top button
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollButton.style.visibility = "visible";
    scrollButton.style.opacity = "1";
  } else {
    scrollButton.style.opacity = "0";
    scrollButton.style.visibility = "hidden";
  }
});

// Add event listener for back-to-top button
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animation for dots
window.addEventListener("DOMContentLoaded", (event) => {
  const dots = Array.from(document.getElementsByClassName("dot"));

  dots.forEach((dot) => {
    const size = Math.random() * 150 + 400; // 400-550px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.top = `${Math.random() * (window.innerHeight - size)}px`;
    dot.style.left = `${Math.random() * (window.innerWidth - size)}px`;

    animateDot(dot);
  });

  function animateDot(dot) {
    // Generate a random direction
    let direction = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    };

    // Normalize the direction vector to get a constant speed
    let length = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    let normalizedDirection = {
      x: direction.x / length,
      y: direction.y / length,
    };

    // Calculate the distance to move in each frame
    let dx = (normalizedDirection.x * window.innerWidth) / 6000; // 6000 frames for 20s
    let dy = (normalizedDirection.y * window.innerHeight) / 6000; // 6000 frames for 20s

    function move() {
      // Clear the canvas
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update the dot's position
      let left = parseFloat(dot.style.left);
      let top = parseFloat(dot.style.top);

      // Check if the dot is off screen
      if (left + dx < 0 || left + dx + dot.offsetWidth > window.innerWidth) {
        // If the dot hits the left or right edge, reverse x direction
        dx = -dx;
      }

      if (top + dy < 0 || top + dy + dot.offsetHeight > window.innerHeight) {
        // If the dot hits the top or bottom edge, reverse y direction
        dy = -dy;
      }

      // Update the dot's position after checking for collisions
      dot.style.left = `${left + dx}px`;
      dot.style.top = `${top + dy}px`;

      // Draw a line from the current position to the target position
      /* ctx.beginPath();
      ctx.moveTo(left + dot.offsetWidth / 2, top + dot.offsetHeight / 2);
      ctx.lineTo(
        left + dx + dot.offsetWidth / 2,
        top + dy + dot.offsetHeight / 2
      );
      ctx.stroke(); */

      // Continue the current animation
      requestAnimationFrame(move);
    }

    // Start the animation
    move();
  }
});
