window.onload = function() {
  var modeSwitch = document.getElementById('mode-switch');
  var body = document.body;

  // Check for saved theme in local storage
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      body.className = savedTheme;
      modeSwitch.innerText = savedTheme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  modeSwitch.onclick = function() {
      if (body.className === 'dark-mode') {
          body.className = 'light-mode';
          modeSwitch.innerText = 'Switch to Dark Mode';
          localStorage.setItem('theme', 'light-mode');
      } else {
          body.className = 'dark-mode';
          modeSwitch.innerText = 'Switch to Light Mode';
          localStorage.setItem('theme', 'dark-mode');
      }
  };
};