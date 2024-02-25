window.onload = function () {
  var body = document.body;

  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.className = savedTheme;
    if (savedTheme === "dark-mode") {
      document
        .getElementById("theme-toggle")
        .querySelector(".fa-sun").style.display = "inline-block";
      document
        .getElementById("theme-toggle")
        .querySelector(".fa-moon").style.display = "none";
    } else {
      document
        .getElementById("theme-toggle")
        .querySelector(".fa-sun").style.display = "none";
      document
        .getElementById("theme-toggle")
        .querySelector(".fa-moon").style.display = "inline-block";
    }
  }

  var dots = document.getElementsByClassName("dot");
  console.log(dots);
  for (var i = 0; i < dots.length; i++) {
    var dot = dots[i];
    var size = Math.random() * (750 - 500) + 500; // Set a random size between 50-100
    dot.style.width = dot.style.height = size + "px";
    dot.style.top =
      Math.random() * (100 - (size / window.innerHeight) * 100) + "%";
    dot.style.left =
      Math.random() * (100 - (size / window.innerWidth) * 100) + "%";
    animateDot(dot, dots);
  }
};

function animateDot(dot, dots) {
  if (dot.isAnimating) {
    return; // If the dot is already animating, don't start another animation
  }

  dot.isAnimating = true; // Set the flag to indicate that the animation is running

  var direction = getDirection(dot, dots); // Get the direction to move in

  // If the direction is {x: 0, y: 0}, generate a new random direction
  if (direction.x === 0 && direction.y === 0) {
    direction = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    };
  }

  // Normalize the direction vector to get a constant speed
  var length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
  var normalizedDirection = {
    x: direction.x / length,
    y: direction.y / length,
  };

  // Calculate the distance to move in each frame
  var dx = (normalizedDirection.x * window.innerWidth) / 2000; // 1200 frames for 20s
  var dy = (normalizedDirection.y * window.innerHeight) / 2000; // 1200 frames for 20s

  function move() {
    // Update the dot's position
    dot.style.left = `${dot.offsetLeft + dx}px`;
    dot.style.top = `${dot.offsetTop + dy}px`;

    // Check if the dot is off screen
    if (
      dot.offsetLeft < 0 ||
      dot.offsetLeft > window.innerWidth ||
      dot.offsetTop < 0 ||
      dot.offsetTop > window.innerHeight
    ) {
      dot.isAnimating = false; // Reset the flag when the animation ends
      // Delay the call to animateDot
      setTimeout(() => animateDot(dot, dots), 100);
    } else {
      // Continue the current animation
      requestAnimationFrame(move);
    }
  }

  // Start the animation
  requestAnimationFrame(move);
}

function getDirection(dot, dots) {
  var x = 0;
  var y = 0;

  var offScreenX = dot.offsetLeft < 0 || dot.offsetLeft > window.innerWidth;
  var offScreenY = dot.offsetTop < 0 || dot.offsetTop > window.innerHeight;

  if (offScreenX || offScreenY) {
    // If the dot is off screen, move towards the center of the screen
    return {
      x: window.innerWidth / 2 - dot.offsetLeft,
      y: window.innerHeight / 2 - dot.offsetTop,
    };
  }

  var touchingAnotherDot = false;
  for (var i = 0; i < dots.length; i++) {
    if (dots[i] === dot) continue;

    var dx = dot.offsetLeft - dots[i].offsetLeft;
    var dy = dot.offsetTop - dots[i].offsetTop;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
      x += dx;
      y += dy;
      touchingAnotherDot = true;
    }
  }

  // If the dot is not touching another dot and the new direction is the same as the previous direction, generate a new random direction
  if (
    !touchingAnotherDot &&
    dot.previousDirection &&
    dot.previousDirection.x === x &&
    dot.previousDirection.y === y
  ) {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
  }

  // Store the new direction as the previous direction for the next call
  dot.previousDirection = { x: x, y: y };

  return { x: x, y: y };
}

document.getElementById("theme-toggle").addEventListener("click", function () {
  var body = document.body;

  var sunIcon = this.querySelector(".fa-sun");
  var moonIcon = this.querySelector(".fa-moon");

  if (body.classList.contains("dark-mode")) {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
    body.style.transition = "all 0.3s ease";
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
  } else {
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
    body.style.transition = "all 0.3s ease";
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  }
});
