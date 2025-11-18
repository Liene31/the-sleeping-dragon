const definitionDiv = document.getElementById("definition");
const gamePlayViewTitle = document.getElementById("game-play-view-title");
const gamePlayViewDescPara = document.getElementById("game-play-view-desc");
const difficultyLevelDiv = document.querySelectorAll(".difficulty-level");
const categoryDiv = document.querySelectorAll(".category");

let isHamburgerMenuClicked = true;
const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// test -> it will be array of API
const wordLength = 5;

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

//Open Classical Modal
document.getElementById("classical-mode").addEventListener("click", () => {
  openModal("difficulty-level-modal");
});

//Close Classical Modal
document
  .getElementById("difficulty-lvl-close-btn")
  .addEventListener("click", () => {
    closeModal("difficulty-level-modal");
  });

//Open Category Modal
document.getElementById("category-mode").addEventListener("click", () => {
  openModal("choose-category-modal");
});

//Close Category Modal
document.getElementById("category-close-btn").addEventListener("click", () => {
  closeModal("choose-category-modal");
});

// Open the hint btn
document.getElementById("hint-btn").addEventListener("click", () => {
  definitionDiv.style.display = "block";
});

// Navigate to GAME PLAY CLASSICAL
difficultyLevelDiv.forEach((level) => {
  level.addEventListener("click", () => {
    const selectedLevel = level.textContent;
    closeModal("difficulty-level-modal");

    switch (selectedLevel) {
      case "Easy":
        setupGamePlayView({
          guesses: 8,
          title: "Classical - Easy Level",
          desc: "8 guesses, free hint",
        });
        break;
      case "Medium":
        setupGamePlayView({
          guesses: 6,
          title: "Classical - Medium Level",
          desc: "6 guesses, free hint",
        });
        break;
      case "Difficult":
        setupGamePlayView({
          guesses: 5,
          title: "Classical - Difficult Level",
          desc: "5 guesses, no free hint",
        });
        break;
    }
  });
});

// Navigate to GAME PLAY TIMED
document.getElementById("timed-mode").addEventListener("click", () => {
  setupGamePlayView({
    guesses: 6,
    title: "Timed",
    desc: "6 guesses, free hint",
    showTimer: true,
  });
  //add timer
});

// Navigate to GAME PLAY CATEGORY
categoryDiv.forEach((category) => {
  category.addEventListener("click", () => {
    const selectedCategory = category.textContent;
    closeModal("choose-category-modal");

    setupGamePlayView({
      guesses: 6,
      title: `Category - ${selectedCategory}`,
      desc: "6 guesses, free hint",
    });
  });
});

// Navigate to GAME PLAY LEARNING
document.getElementById("learning-mode").addEventListener("click", () => {
  setupGamePlayView({
    guesses: 6,
    title: "Learning",
    desc: "6 guesses, free hint",
    showDef: true,
  });
});

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function setupGamePlayView({
  guesses,
  title,
  desc,
  showDef = false,
  showTimer = false,
}) {
  openGamePlayView(guesses);
  gamePlayViewTitle.textContent = title;
  gamePlayViewDescPara.textContent = desc;
  definitionDiv.style.display = showDef ? "block" : "none";
  document.getElementById("timer-container").style.display = showTimer
    ? "flex"
    : "none";
}

function openGamePlayView(guesses) {
  const homeViewSec = document.getElementById("home-view");
  const gamePlayViewSec = document.getElementById("game-play-view");
  const wordTileDiv = document.getElementById("word-tile");
  homeViewSec.style.display = "none";
  gamePlayViewSec.style.display = "flex";

  drawEyeClosed(guesses);
  drawTile(wordLength, wordTileDiv);
  drawQwerty();
}

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
