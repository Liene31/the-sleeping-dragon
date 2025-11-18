const classicalModeDiv = document.getElementById("classical-mode");
const timedModeDiv = document.getElementById("timed-mode");
const gamePlayViewTitle = document.getElementById("game-play-view-title");
const gamePlayViewDescPara = document.getElementById("game-play-view-desc");
const difficultyLvlModalSec = document.getElementById("difficulty-level-modal");
const homeViewSec = document.getElementById("home-view");
const gamePlayViewSec = document.getElementById("game-play-view");
const difficultyLvlCloseBtn = document.getElementById(
  "difficulty-lvl-close-btn"
);
const difficultyLevelDiv = document.querySelectorAll(".difficulty-level");
const hamburgerMenuBtn = document.getElementById("hamburger-menu");
let isHamburgerMenuClicked = true;
const dragonEyeDiv = document.getElementById("dragon-eye");
const wordTileDiv = document.getElementById("word-tile");
const qwertyDiv = document.getElementById("qwerty");
const homeBtn = document.getElementById("home-btn");

const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// test -> it will be array of API
const wordLength = 5;

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

//Open Difficulty Levels (Classical Mode)
classicalModeDiv.addEventListener("click", () => {
  difficultyLvlModalSec.style.display = "flex";
});

//Close Difficulty Levels (Classical Mode)
difficultyLvlCloseBtn.addEventListener("click", () => {
  difficultyLvlModalSec.style.display = "none";
});

// Navigate to GAME PLAY CLASSICAL
difficultyLevelDiv.forEach((div) => {
  div.addEventListener("click", () => {
    difficultyLvlModalSec.style.display = "none";

    if (div.textContent === "Easy") {
      openGamePlayView(8);
      gamePlayViewTitle.textContent = "Classical - Easy Level";
      gamePlayViewDescPara.textContent = "8 guesses, free hint";
    } else if (div.textContent === "Medium") {
      openGamePlayView(6);
      gamePlayViewTitle.textContent = "Classical - Medium Level";
      gamePlayViewDescPara.textContent = "6 guesses, free hint";
    } else if (div.textContent === "Difficult") {
      openGamePlayView(5);
      gamePlayViewTitle.textContent = "Classical - Difficult Level";
      gamePlayViewDescPara.textContent = "5 guesses, no free hint";
    }
  });
});

// Navigate to GAME PLAY TIMED
timedModeDiv.addEventListener("click", () => {
  const timerContainerDiv = document.getElementById("timer-container");
  openGamePlayView(6);
  gamePlayViewTitle.textContent = "Timed";
  gamePlayViewDescPara.textContent = "6 guesses, free hint";
  timerContainerDiv.style.display = "flex";
  //add timer
});

function openGamePlayView(guesses) {
  homeViewSec.style.display = "none";
  gamePlayViewSec.style.display = "flex";

  drawEyeClosed(guesses);
  drawTile(wordLength, wordTileDiv);
  drawQwerty();
}

function drawEyeClosed(guess) {
  for (let i = 0; i < guess; i++) {
    const imgEL = document.createElement("img");
    imgEL.classList.add("eye-closed");
    imgEL.src = "./images/eye-closed.svg";
    imgEL.alt = "icon of eye closed";

    dragonEyeDiv.append(imgEL);
  }
}

function drawTile(length, targetDiv, array) {
  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (array) {
      div.textContent = array[i];
    }

    targetDiv.append(div);
  }
}

function drawQwertyRow(tile, index) {
  for (let i = 0; i < 1; i++) {
    const qwertyRowDiv = document.createElement("div");
    qwertyRowDiv.classList.add("qwerty-row");
    qwertyDiv.append(qwertyRowDiv);

    for (let i = 0; i < 1; i++) {
      drawTile(tile, qwertyRowDiv, qwertyArray[index]);
    }
  }
}

function drawQwerty() {
  drawQwertyRow(10, 0);
  drawQwertyRow(9, 1);
  drawQwertyRow(7, 2);
}
