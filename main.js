const classicalModeDiv = document.getElementById("classical-mode");
const difficultyLvlModalSec = document.getElementById("difficulty-level-modal");
const difficultyLvlCloseBtn = document.getElementById(
  "difficulty-lvl-close-btn"
);
const hamburgerMenuBtn = document.getElementById("hamburger-menu");

let isHamburgerMenuClicked = true;

//Toggle hamburger menu
hamburgerMenuBtn.addEventListener("click", () => {
  const hamburgerMenuIconSpan = document.getElementById("hamburger-menu-icon");
  const closeMenuIconSpan = document.getElementById("close-menu-icon");

  if (isHamburgerMenuClicked) {
    hamburgerMenuIconSpan.style.display = "none";
    closeMenuIconSpan.style.display = "block";
    isHamburgerMenuClicked = false;

    if (window.matchMedia("(max-width: 650px)").matches) {
      document.querySelector(".menu").style.display = "flex";
    }
  } else {
    hamburgerMenuIconSpan.style.display = "block";
    closeMenuIconSpan.style.display = "none";
    isHamburgerMenuClicked = true;

    if (window.matchMedia("(max-width: 650px)").matches) {
      document.querySelector(".menu").style.display = "none";
    }
  }
});

//Opens Difficulty Levels (Classical Mode)
classicalModeDiv.addEventListener("click", () => {
  difficultyLvlModalSec.style.display = "flex";
});

//Closes Difficulty Levels (Classical Mode)
difficultyLvlCloseBtn.addEventListener("click", () => {
  difficultyLvlModalSec.style.display = "none";
});
