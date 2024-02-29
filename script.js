/*
  Creeper76's Software License
  
  Copyright (c) 2024 Creeper76

  This software is licensed under the terms of Creeper76's Software License.
  See the LICENSE file for more details.

  This software is provided "as is", without warranty of any kind, express or implied.
  The author(s) of the software are not liable for any damages or losses arising from the use of the software.
*/

const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = themeToggle.querySelector(".fa-sun");
const moonIcon = themeToggle.querySelector(".fa-moon");

// Function to update theme
function updateTheme(theme) {
  body.className = theme;
  sunIcon.style.display = theme === "dark-mode" ? "inline-block" : "none";
  moonIcon.style.display = theme === "dark-mode" ? "none" : "inline-block";
  body.style.transition = "all 0.3s ease";
}

// On load, set the theme from local storage
const savedTheme = localStorage.getItem("theme") || "light-mode";
updateTheme(savedTheme);

// Add event listener for theme toggle
themeToggle.addEventListener("click", function () {
  const newTheme = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
  updateTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Create a canvas
  /* const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "rgb(255, 100, 100)"; */

  // Get all dots
  const dots = Array.from(document.getElementsByClassName("dot"));

  // Initialize each dot
  dots.forEach((dot) => {
    // Set random size and position
    const size = Math.random() * 150 + 400; // 400-550px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.top = `${Math.random() * (window.innerHeight - size)}px`;
    dot.style.left = `${Math.random() * (window.innerWidth - size)}px`;

    // Start animation
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
