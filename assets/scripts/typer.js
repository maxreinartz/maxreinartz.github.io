function typer(element) {
  var i = 0;
  var j = 0;
  var currentPhrase = [];
  var isDeleting = false;
  var isEnd = false;
  var txt = JSON.parse(element.getAttribute("data-text"));

  function loop() {
    isEnd = false;
    element.innerHTML = currentPhrase.join("") + (isEnd ? "" : "_");

    if (i < txt.length) {
      if (!isDeleting && j <= txt[i].length) {
        currentPhrase.push(txt[i][j]);
        j++;
        element.innerHTML = currentPhrase.join("") + "_";
      }

      if (isDeleting && j <= txt[i].length) {
        currentPhrase.pop(txt[i][j]);
        j--;
        element.innerHTML = currentPhrase.join("") + "_";
      }

      if (j == txt[i].length) {
        isEnd = true;
        isDeleting = true;
      }

      if (isDeleting && j === 0) {
        currentPhrase = [];
        isDeleting = false;
        i++;
        if (i == txt.length) {
          i = 0;
        }
      }
    }
    const spedUp = Math.random() * (100 - 70) + 70;
    const normalSpeed = Math.random() * (150 - 100) + 100;
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
    const pauseAfterDelete = 500; // Add a pause after deleting
    setTimeout(loop, !isDeleting && j === 0 ? pauseAfterDelete : time);
  }

  loop();
}

document.querySelectorAll(".typer-text").forEach(typer);