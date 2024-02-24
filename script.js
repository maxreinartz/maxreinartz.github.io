window.onload = function () {
  var body = document.body;

  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.className = savedTheme;
    if (savedTheme === "dark-mode") {
      document.getElementById('theme-toggle').querySelector('.fa-sun').style.display = 'inline-block';
      document.getElementById('theme-toggle').querySelector('.fa-moon').style.display = 'none';
    } else {
      document.getElementById('theme-toggle').querySelector('.fa-sun').style.display = 'none';
      document.getElementById('theme-toggle').querySelector('.fa-moon').style.display = 'inline-block';
    }
  }
};

document.getElementById('theme-toggle').addEventListener('click', function() {
  var body = document.body;

  var sunIcon = this.querySelector('.fa-sun');
  var moonIcon = this.querySelector('.fa-moon');

  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline-block';
    body.style.transition = 'all 0.3s ease';
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem("theme", "light-mode");
  } else {
    sunIcon.style.display = 'inline-block';
    moonIcon.style.display = 'none';
    body.style.transition = 'all 0.3s ease';
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem("theme", "dark-mode");
  }
});