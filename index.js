const classicalModeDiv = document.getElementById("classical-mode");
const timedModeDiv = document.getElementById("timed-mode");
const categoryModeDiv = document.getElementById("category-mode");
const learningModeDiv = document.getElementById("learning-mode");

const difficultyLevelDiv = document.querySelectorAll(".difficulty-level");

const difficultyLevelModalSection = document.getElementById(
  "difficulty-level-modal"
);
const chooseCategoryModalSection = document.getElementById(
  "choose-category-modal"
);
const homeViewSection = document.getElementById("home-view");
const gamePlayViewSection = document.getElementById("game-play-view");

const gamePlayViewTitle = document.getElementById("game-play-view-title");
const gamePlayViewPara = document.getElementById("game-play-view-desc");

const wordTileDiv = document.getElementById("word-tile");

const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

let isHamburgerMenuClicked = true;

//Toggle hamburger menu
document.getElementById("hamburger-menu").addEventListener("click", () => {
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

function openDifficultyModal() {
  difficultyLevelModalSection.style.display = "flex";
}

function openEasyGamePlayView(word) {
  homeViewSection.style.display = "none";
  gamePlayViewSection.style.display = "flex";
  gamePlayViewTitle.textContent = "Classical - Easy Level";
  gamePlayViewPara.textContent = `8 guesses, free hint + ${word}`;

  drawEyeClosed(8);
  drawTile(word.length, wordTileDiv);
  drawQwerty();
}

//Loops through the levels
difficultyLevelDiv.forEach((level) => {
  level.addEventListener("click", () => {
    const levelSelected = level.textContent;
    difficultyLevelModalSection.style.display = "none";

    getWord(levelSelected);
  });
});

classicalModeDiv.addEventListener("click", openDifficultyModal);

function drawEyeClosed(guess) {
  const dragonEyeDiv = document.getElementById("dragon-eye");
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
  const qwertyDiv = document.getElementById("qwerty");
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

function generateRandomNum(length) {
  return Math.floor(Math.random() * length);
}

function getWord(category) {
  const jsonUrl = "./test-words.json";
  axios
    .get(jsonUrl)
    .then((res) => {
      const easyArray = res.data.modes.easy.all;
      const randomNumEasy = generateRandomNum(easyArray.length);
      const randomWordEasy = easyArray[randomNumEasy];

      if (category === "Easy") {
        openEasyGamePlayView(randomWordEasy);
      }
    })
    .catch((error) => console.error(error.message));
}
