const classicalModeDiv = document.getElementById("classical-mode");
const timedModeDiv = document.getElementById("timed-mode");
const categoryModeDiv = document.getElementById("category-mode");
const learningModeDiv = document.getElementById("learning-mode");

const difficultyLevelDiv = document.querySelectorAll(".difficulty-level");
const chooseCategoryDiv = document.querySelectorAll(".category");

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
const categoryCloseBtn = document.getElementById("category-close-btn");

const playAgainBtn = document.getElementById("play-again-btn");
const hintBtn = document.getElementById("hint-btn");
const homeBtn = document.getElementById("home-btn");

const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

let isHamburgerMenuClicked = true;
let wordToGuess = "";
let category = "";
let letterClicked = "";
let guess = 6;
let scoreWon = 0;
let scoreLost = 0;
let guessedLettersArray = [];

checkIfElExists(classicalModeDiv, "click", openDifficultyModal);
checkIfElExists(timedModeDiv, "click", triggerTimedMode);
checkIfElExists(categoryModeDiv, "click", openCategoryModal);
checkIfElExists(learningModeDiv, "click", triggerLearningMode);
checkIfElExists(qwertyDiv, "click", getPressedLetter);
checkIfElExists(difficultyLvlCloseBtn, "click", closeDifficultyLvl);
checkIfElExists(categoryCloseBtn, "click", closeCategoryModal);
checkIfElExists(hintBtn, "click", getDefinition);
checkIfElExists(playAgainBtn, "click", restartGame);
checkIfElExists(homeBtn, "click", saveScore);

//Check if the element exists on the page
function checkIfElExists(selector, event, handler) {
  if (selector) {
    selector.addEventListener(event, handler);
  }
}

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

function openCategoryModal() {
  chooseCategoryModalSection.style.display = "flex";
}

function closeDifficultyLvl() {
  difficultyLevelModalSection.style.display = "none";
}

function closeCategoryModal() {
  chooseCategoryModalSection.style.display = "none";
}

function openGamePlayView(word, category, type) {
  homeViewSection.style.display = "none";
  gamePlayViewSection.style.display = "flex";
  gamePlayViewTitle.textContent = `${category} ${type}`;
  gamePlayViewPara.textContent = `6 guesses, free hint`;
  console.log(`word to guess is ${word}`);
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

function updateScore() {
  scoreWonSpan.textContent = scoreWon;
  scoreLostSpan.textContent = scoreLost;
}

//Loops through the difficulty levels (Classical Mode)
difficultyLevelDiv.forEach((level) => {
  level.addEventListener("click", () => {
    category = level.textContent;
    difficultyLevelModalSection.style.display = "none";
    getWord(category);
  });
});

//Loops through the categories (Category Mode)
chooseCategoryDiv.forEach((subject) => {
  subject.addEventListener("click", () => {
    category = subject.textContent;
    chooseCategoryModalSection.style.display = "none";
    getWord(category);
  });
});

function triggerTimedMode() {
  category = "Timed";
  getWord(category);
}

function triggerLearningMode() {
  category = "Learning";
  getWord(category);
}

function guessWord(letterClicked) {
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

function generateRandomWord(array) {
  const randomNum = generateRandomNum(array.length);
  console.log(array.length);
  const randomWord = array[randomNum];
  return randomWord;
}

function getWord(category) {
  const jsonUrl = "./words.json";
  axios
    .get(jsonUrl)
    .then((res) => {
      const easyArray = res.data.modes.easy.all;
      const mediumArray = res.data.modes.medium.all;
      const difficultArray = res.data.modes.difficult.all;
      const timedArray = res.data.modes.timed.all;
      const learningArray = res.data.modes.learning.all;
      const animalsArray = res.data.categories.animals;
      const gastronomyArray = res.data.categories.gastronomy;
      const geographyArray = res.data.categories.geography;
      const hobbiesArray = res.data.categories.hobbies;

      if (category === "Easy") {
        wordToGuess = generateRandomWord(easyArray);
        openGamePlayView(wordToGuess, category, "Level");
      } else if (category === "Medium") {
        wordToGuess = generateRandomWord(mediumArray);
        openGamePlayView(wordToGuess, category, "Level");
      } else if (category === "Difficult") {
        wordToGuess = generateRandomWord(difficultArray);
        openGamePlayView(wordToGuess, category, "Level");
      } else if (category === "Timed") {
        wordToGuess = generateRandomWord(timedArray);
        openGamePlayView(wordToGuess, category, "Mode");
      } else if (category === "Learning") {
        wordToGuess = generateRandomWord(learningArray);
        openGamePlayView(wordToGuess, category, "Mode");
      } else if (category === "Animals") {
        wordToGuess = generateRandomWord(animalsArray);
        openGamePlayView(wordToGuess, category, "Category");
      } else if (category === "Gastronomy") {
        wordToGuess = generateRandomWord(gastronomyArray);
        openGamePlayView(wordToGuess, category, "Category");
      } else if (category === "Geography") {
        wordToGuess = generateRandomWord(geographyArray);
        openGamePlayView(wordToGuess, category, "Category");
      } else if (category === "Hobbies") {
        wordToGuess = generateRandomWord(hobbiesArray);
        openGamePlayView(wordToGuess, category, "Category");
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

let wonScoreArray = [];
const savedWonScore = JSON.parse(localStorage.getItem("wonScore"));
console.log(savedWonScore);

if (savedWonScore) {
  wonScoreArray = savedWonScore;
}

function saveScore() {
  wonScoreArray.push(scoreWon);
  localStorage.setItem("wonScore", JSON.stringify(wonScoreArray));
}

// localStorage.clear();
