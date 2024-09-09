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

  loadTheme();
};
