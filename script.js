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
    const applyTheme = (elements, darkColor, lightColor) => {
      const savedTheme = localStorage.getItem("selectedTheme");
      const backgroundColor = savedTheme === "dark" ? darkColor : lightColor;
      elements.forEach((element) => {
        element.style.background = backgroundColor;
      });
    };

    const acrylicElements = document.querySelectorAll(".acrylic");
    console.log("[DEBUG] Found acrylic element : " + acrylicElements.length);
    applyTheme(acrylicElements, "rgb(0, 0, 0)", "rgb(255, 255, 255)");

    const imgContainerElements = document.querySelectorAll(".img-container");
    console.log(
      "[DEBUG] Found img-container element : " + imgContainerElements.length
    );
    applyTheme(imgContainerElements, "rgb(225, 225, 225)", "rgb(60, 60, 60)");
  }

  loadTheme();
};
