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

const definitionContainerDiv = document.getElementById("definition-container");
const definitionPara = document.getElementById("definition");

const wordTileDiv = document.getElementById("word-tile");
const qwertyDiv = document.getElementById("qwerty");
const dragonEyeDiv = document.getElementById("dragon-eye");

const scoreWonSpan = document.getElementById("score-won");
const scoreLostSpan = document.getElementById("score-lost");

const difficultyLvlCloseBtn = document.getElementById(
  "difficulty-lvl-close-btn"
);

const playAgainBtn = document.getElementById("play-again-btn");
const hintBtn = document.getElementById("hint-btn");

const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

let isHamburgerMenuClicked = true;
let wordToGuess = "";
let category = "";
// let randomWordMediumWord = "";
let letterClicked = "";
let guess = 6;
let scoreWon = 0;
let scoreLost = 0;
let guessedLettersArray = [];

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

function closeDifficultyLvl() {
  difficultyLevelModalSection.style.display = "none";
}

//gameSetup

function gameSetup() {
  //gameSetup
}

//Might need to change for general use
function openGamePlayView(word, category) {
  homeViewSection.style.display = "none";
  gamePlayViewSection.style.display = "flex";
  gamePlayViewTitle.textContent = `Classical - ${category} Level`;
  gamePlayViewPara.textContent = `6 guesses, free hint + ${word}`;
  qwertyDiv.classList.remove("disable-clicks");
  qwertyDiv.innerHTML = "";
  playAgainBtn.disabled = true;
  definitionContainerDiv.style.display = "none";
  definitionPara.textContent = "";
  guessedLettersArray = [];
  updateScore();
  drawEyes(guess);
  drawTile(word.length, wordTileDiv);
  drawQwerty();
}

function openMediumGamePlayView() {
  //medium
}

function updateScore() {
  scoreWonSpan.textContent = scoreWon;
  scoreLostSpan.textContent = scoreLost;
}

//Loops through the difficulty levels
difficultyLevelDiv.forEach((level) => {
  level.addEventListener("click", () => {
    category = level.textContent;
    difficultyLevelModalSection.style.display = "none";
    getWord(category);
  });
});

function guessWord(letterClicked) {
  // const wordToGuess = randomWordEasyWord;
  const letterArray = [...wordToGuess];
  letterClicked = letterClicked.toLowerCase();
  isLetterCorrect = false;

  letterArray.forEach((letter, i) => {
    if (letterClicked === letter) {
      isLetterCorrect = true;
      guessedLettersArray[i] = letterClicked;
    }
  });

  drawTile(wordToGuess.length, wordTileDiv, guessedLettersArray);

  if (!isLetterCorrect) {
    guess--;
    drawEyes();
    if (guess <= 0) {
      gameEnd(letterArray, "lost");
    }
  }

  if (guessedLettersArray.toString() === letterArray.toString()) {
    gameEnd([], "won");
  }
}

function gameEnd(word, gameOutcome) {
  qwertyDiv.classList.add("disable-clicks");
  playAgainBtn.disabled = false;
  if (gameOutcome === "lost") {
    scoreLost++;
    updateScore();
    showGameMessage(gameOutcome);
    drawTile(word.length, wordTileDiv, word);
  } else {
    scoreWon++;
    updateScore();
    showGameMessage(gameOutcome);
  }
}

function showGameMessage(gameOutcome) {
  dragonEyeDiv.innerHTML = "";
  const gameOutcomePara = document.createElement("p");
  gameOutcomePara.classList.add("game-outcome-text");
  gameOutcomePara.textContent = `You ${gameOutcome}`;
  dragonEyeDiv.append(gameOutcomePara);
}

function getPressedLetter(e) {
  letterClicked = e.target.textContent;

  if (!e.target.classList.contains("transparent")) {
    e.target.className += " transparent";
    guessWord(letterClicked);
  }
}

function revealDefinition(definition) {
  console.log("clicked");
  console.log(definition);
  definitionContainerDiv.style.display = "block";
  definitionPara.textContent = definition;
}

function drawEyes() {
  dragonEyeDiv.innerHTML = "";
  for (let c = 0; c < 6 - guess; c++) {
    const imgEL = document.createElement("img");
    imgEL.classList.add("eye-closed");
    imgEL.src = "./images/eye-open.svg";
    imgEL.alt = "icon of eye closed";
    dragonEyeDiv.append(imgEL);
  }
  for (let i = 0; i < guess; i++) {
    const imgEL = document.createElement("img");
    imgEL.classList.add("eye-closed");
    imgEL.src = "./images/eye-closed.svg";
    imgEL.alt = "icon of eye closed";
    dragonEyeDiv.append(imgEL);
  }
}

function drawTile(length, targetDiv, array) {
  targetDiv.innerHTML = "";
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
    qwertyRowDiv.classList.add("qwerty-row", "transparent");
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
      const mediumArray = res.data.modes.medium.all;
      const difficultArray = res.data.modes.difficult.all;
      const randomNumEasy = generateRandomNum(easyArray.length);
      const randomNumMedium = generateRandomNum(mediumArray.length);
      const randomNumDifficult = generateRandomNum(difficultArray.length);
      randomWordEasyWord = easyArray[randomNumEasy];
      randomWordMediumWord = mediumArray[randomNumMedium];
      randomWordDifficultWord = difficultArray[randomNumDifficult];

      if (category === "Easy") {
        wordToGuess = randomWordEasyWord;
        openGamePlayView(wordToGuess, category);
      } else if (category === "Medium") {
        wordToGuess = randomWordMediumWord;
        openGamePlayView(randomWordMediumWord, category);
      } else if (category === "Difficult") {
        wordToGuess = randomWordDifficultWord;
        openGamePlayView(randomWordDifficultWord, category);
      }
    })
    .catch((error) => console.error(error.message));
}

function getDefinition() {
  const apiKey = "bcb77ca1-ddf7-4968-863e-3b2bc332f3ed";
  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${wordToGuess}?key=${apiKey}`;

  axios
    .get(apiUrl)
    .then((res) => {
      const definition = res.data[0].shortdef[0];
      revealDefinition(definition);
    })
    .catch((error) => console.error(error.message));
}

function restartGame() {
  getWord(category);
  guess = 6;
}

qwertyDiv.addEventListener("click", getPressedLetter);
classicalModeDiv.addEventListener("click", openDifficultyModal);
difficultyLvlCloseBtn.addEventListener("click", closeDifficultyLvl);
hintBtn.addEventListener("click", getDefinition);
playAgainBtn.addEventListener("click", restartGame);
