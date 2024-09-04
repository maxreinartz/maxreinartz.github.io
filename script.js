function updateThemeColors() {
  const root = document.documentElement;
  const isDark = document.body.classList.contains('dark');

  if (isDark) {
    root.style.setProperty('--dot1-color', '#800080'); // Purple
    root.style.setProperty('--dot2-color', '#4b0082'); // Indigo
    root.style.setProperty('--dot3-color', '#0000ff'); // Blue
    root.style.setProperty('--dot4-color', '#00bfff'); // Deep Sky Blue
    root.style.setProperty('--dot5-color', '#00ffff'); // Cyan
  } else {
    root.style.setProperty('--dot1-color', '#ff0000'); // Red
    root.style.setProperty('--dot2-color', '#ff4000'); // Orange Red
    root.style.setProperty('--dot3-color', '#ff8000'); // Orange
    root.style.setProperty('--dot4-color', '#ffc000'); // Gold
    root.style.setProperty('--dot5-color', '#ffff00'); // Yellow
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  updateThemeColors();
}

// Initial call to set the theme colors based on the current theme
updateThemeColors();