/*
  Creeper76's Software License
  
  Copyright (c) 2024 Creeper76

  This software is licensed under the terms of Creeper76's Software License.
  See the LICENSE file for more details.

  This software is provided "as is", without warranty of any kind, express or implied.
  The author(s) of the software are not liable for any damages or losses arising from the use of the software.
*/

import { getDeviceType, getBrowser } from "./assets/scripts/checkDevice.js";

// DOM elements
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = themeToggle.querySelector(".fa-sun");
const moonIcon = themeToggle.querySelector(".fa-moon");
const scrollButton = document.getElementById("back-to-top");
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("website");

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

  const savedTheme = localStorage.getItem("theme") || "dark-mode";
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

  if (getBrowser() === "Safari") {
    var message = document.createElement("div");
    message.id = "safari-message";
    message.textContent =
      "Warning: This website may not work properly on Safari. Please use a different browser for the best experience.";
    document.body.appendChild(message);
  }

  continueButton.onclick = function () {
    localStorage.setItem("lastVisit", new Date().getTime());
    mainContent.classList.remove("hide-content");
    warningBubble.style.display = "none";
    continueButton.style.display = "none";
  };

  var dropArea = document.getElementById("drop-area");

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add("hover");
  }

  function unhighlight(e) {
    dropArea.classList.remove("hover");
  }

  dropArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    var dt = e.dataTransfer;
    var file = dt.files[0];
    uploadWebsite(file);
  }

  dropArea.addEventListener(
    "click",
    function () {
      document.getElementById("website").click();
    },
    false
  );

  document.getElementById("website").addEventListener(
    "change",
    function () {
      uploadWebsite(this.files[0]);
    },
    false
  );

  fileInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      console.log("File selected:", this.files[0]); // Add this line
      dropArea.textContent = "Uploading, please wait";
      dropArea.classList.add("uploading");
    }
  });

  fileInput.addEventListener("loadend", function () {
    dropArea.textContent = "Drop file here or click to upload";
    dropArea.classList.remove("uploading");
  });
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

// Website uploader
function uploadWebsite(file) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append("website", file);
  var startTime = Date.now();
  const uploadData = document.getElementById("upload-data");

  xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      const percentComplete = ((e.loaded / e.total) * 100).toFixed(1);
      const timeElapsed = Date.now() - startTime;
      const speed = e.loaded / (timeElapsed / 1000);
      const speedInMbps = (speed / (1024 * 1024)).toFixed(2);
      const uploadedInMb = (e.loaded / (1024 * 1024)).toFixed(2);

      uploadData.textContent = `Uploaded: ${uploadedInMb} MB (${percentComplete}%), Speed: ${speedInMbps} MB/s`;
    }
  });

  xhr.open("POST", "http://pnode3.danbot.host:6048/upload", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      document.getElementById("id").textContent = "ID: " + data.id;
      var url = "http://custom.maxreinartz.me/" + data.id;
      var altUrl = "http://pnode3.danbot.host:6048/" + data.id
      document.getElementById("url").innerHTML =
        'URL: <a href="' + url + '" target="_blank">' + url + '</a> or <a href="' + altUrl + '" target="_blank">' + altUrl + '</a>';
      document.getElementById("bubble").style.display = "block";
    } else {
      if (xhr.status === 413) {
        alert("File is too large. It must be less than 100 MB.");
      } else {
        alert("An error occurred while uploading the file.");
      }
    }
  };
  xhr.send(formData);
}
