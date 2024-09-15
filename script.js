window.onload = function () {
  const themeToggle = document.getElementById("theme-toggle");

  const themeStylesheet = document.createElement("link");
  themeStylesheet.rel = "stylesheet";
  document.head.appendChild(themeStylesheet);

  function loadTheme() {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      themeStylesheet.href = `assets/themes/${savedTheme}.css`;
      themeToggle.innerHTML =
        savedTheme === "dark"
          ? '<i class="fas fa-moon"></i>'
          : '<i class="fas fa-sun"></i>';
    } else {
      themeStylesheet.href = `assets/themes/dark.css`;
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  function changeTheme(themeName) {
    document.getElementById("loading-screen").classList.remove("hidden");
    localStorage.setItem("selectedTheme", themeName);
    themeStylesheet.href = `assets/themes/${themeName}.css`;
    location.reload();
  }

  themeToggle.onclick = function () {
    const currentTheme = themeStylesheet.href.includes("dark")
      ? "light"
      : "dark";
    changeTheme(currentTheme);
  };

  themeStylesheet.onload = function () {
    const bgShaderScript = document.createElement("script");
    bgShaderScript.src = "assets/bgShader.js";
    document.body.appendChild(bgShaderScript);

    var checkBgDoneInterval = setInterval(function () {
      if (bgDone) {
        clearInterval(checkBgDoneInterval);
        document.getElementById("loading-screen").classList.add("hidden");
      }
    }, 50);
  };

  ifOnSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  console.log("[DEBUG] If on Safari : " + ifOnSafari);

  if (ifOnSafari) {
    const projectItems = document.querySelectorAll("div.project-item.acrylic");
    console.log("[DEBUG] Found project item(s) : " + projectItems.length);
    projectItems.forEach((element) => {
      element.style.webkitBackdropFilter = "none";
      element.style.backdropFilter = "none";
    });

    const imgContainerElements = document.querySelectorAll(".img-container");
    console.log(
      "[DEBUG] Found img-container element : " + imgContainerElements.length
    );
    imgContainerElements.forEach((element) => {
      element.style.webkitBackdropFilter = "none";
      element.style.backdropFilter = "none";
    });
  }

  function checkForConfetti() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("confetti")) {
      const confettiScript = document.querySelector(
        'script[src="/assets/clickEffect.js"]'
      );
      if (confettiScript) {
        console.log("[DEBUG] Confetti script found.");
        setTimeout(() => {
          startConfetti();
        }, 500);
      } else {
        console.warn("[DEBUG] Confetti script not found.");
      }
    }
  }

  checkForConfetti();
  loadTheme();
};
