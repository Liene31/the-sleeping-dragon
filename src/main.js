const classicalModeDiv = document.getElementById("classical-mode");
const timedModeDiv = document.getElementById("timed-mode");
const categoryModeDiv = document.getElementById("category-mode");
const learningModeDiv = document.getElementById("learning-mode");
const gameModesDiv = document.getElementById("game-modes");

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

const timerContainerDiv = document.getElementById("timer-container");
const timerSpan = document.getElementById("timer");

const wordTileDiv = document.getElementById("word-tile");
const qwertyDiv = document.getElementById("qwerty");
const dragonEyeDiv = document.getElementById("dragon-eye");

const scoreWonSpan = document.getElementById("score-won");
const scoreLostSpan = document.getElementById("score-lost");

const tableBody = document.getElementById("table-body");
const totalWonTd = document.getElementById("total-won");
const totalLostTd = document.getElementById("total-lost");

const difficultyLvlCloseBtn = document.getElementById(
  "difficulty-lvl-close-btn"
);
const categoryCloseBtn = document.getElementById("category-close-btn");

const playAgainBtn = document.getElementById("play-again-btn");
const hintBtn = document.getElementById("hint-btn");
const siteThemeBtn = document.querySelectorAll(".theme");

const qwertyArray = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

let isHamburgerMenuClicked = true;
let wordToGuess = "";
let category = "";
let letterClicked = "";
let timer;
let guess = 6;
let scoreWon = 0;
let scoreLost = 0;
let guessedLettersArray = [];
const totalWon = [];
const totalLost = [];

checkIfElExists(classicalModeDiv, "click", openDifficultyModal);
checkIfElExists(timedModeDiv, "click", triggerTimedMode);
checkIfElExists(categoryModeDiv, "click", openCategoryModal);
checkIfElExists(learningModeDiv, "click", triggerLearningMode);
checkIfElExists(qwertyDiv, "click", getPressedLetter);
checkIfElExists(difficultyLvlCloseBtn, "click", closeDifficultyLvl);
checkIfElExists(categoryCloseBtn, "click", closeCategoryModal);
checkIfElExists(hintBtn, "click", getDefinition);
checkIfElExists(playAgainBtn, "click", restartGame);

//Check if the element exists on the page
function checkIfElExists(selector, event, handler) {
  if (selector) {
    selector.addEventListener(event, handler);
  }
}

siteThemeBtn.forEach((theme) => {
  theme.addEventListener("click", changeTheme);
});

//Toggle hamburger menu
document.getElementById("hamburger-menu").addEventListener("click", () => {
  const hamburgerMenuIconSpan = document.getElementById("hamburger-menu-icon");
  const closeMenuIconSpan = document.getElementById("close-menu-icon");

  if (isHamburgerMenuClicked) {
    hamburgerMenuIconSpan.style.display = "none";
    closeMenuIconSpan.style.display = "block";
    isHamburgerMenuClicked = false;
    document.body.style.overflowY = "hidden";

    if (window.matchMedia("(max-width: 650px)").matches) {
      document.querySelector(".menu").style.display = "flex";
    }
  } else {
    hamburgerMenuIconSpan.style.display = "block";
    closeMenuIconSpan.style.display = "none";
    isHamburgerMenuClicked = true;
    document.body.style.overflowY = "visible";

    if (window.matchMedia("(max-width: 650px)").matches) {
      document.querySelector(".menu").style.display = "none";
    }
  }
});

const savedTheme = localStorage.getItem("theme");

//return true or false
let isDarkTheme = !(savedTheme === "dark");

//re-load the page and executes the function (isDakTheme is re-evaluated)
//when change theme Btn is clicked it doesn't reload the page
//and continue with what's already saved in isDarkTheme
window.addEventListener("DOMContentLoaded", () => {
  changeTheme();
});

//Change the Theme of the WebSite
function changeTheme() {
  const root = document.documentElement;

  if (isDarkTheme) {
    isDarkTheme = false;
    console.log(isDarkTheme);
    localStorage.setItem("theme", "grey");
    root.style.setProperty("--color-bg-dark", "#707378");
    root.style.setProperty("--color-dark-1", "#2B2B2E");
    root.style.setProperty("--color-dark-2", "#1E1E20");
    root.style.setProperty("--color-dark-3", "#3A3A3E");
    root.style.setProperty("--color-opacity", "rgb(15,15,17, 0.7)");
    root.style.setProperty("--color-yellow", "#E0B548");
    root.style.setProperty("--color-accent", "#FFF9EE");
    root.style.setProperty(
      "--bg-image",
      "url(../assets/images/dragon-grey-bg.jpg)"
    );
  } else {
    isDarkTheme = true;
    console.log(isDarkTheme);
    localStorage.setItem("theme", "dark");
    root.style.setProperty("--color-bg-dark", "#1d0e09");
    root.style.setProperty("--color-dark-1", "#3c342e");
    root.style.setProperty("--color-dark-2", "#302924");
    root.style.setProperty("--color-dark-3", "#4e4842");
    root.style.setProperty("--color-opacity", "rgba(26, 12, 9, 0.7)");
    root.style.setProperty("--color-yellow", "#eeb84c");
    root.style.setProperty("--color-accent", "#ebdbab");
    root.style.setProperty("--bg-image", "url(../assets/images/dragon-bg.jpg)");
  }
}

function openDifficultyModal() {
  difficultyLevelModalSection.style.display = "flex";
  gameModesDiv.classList.add("disable-clicks");
}

function openCategoryModal() {
  chooseCategoryModalSection.style.display = "flex";
  gameModesDiv.classList.add("disable-clicks");
}

function closeDifficultyLvl() {
  difficultyLevelModalSection.style.display = "none";
  gameModesDiv.classList.remove("disable-clicks");
}

function closeCategoryModal() {
  chooseCategoryModalSection.style.display = "none";
  gameModesDiv.classList.remove("disable-clicks");
}

function openGamePlayView(word, type, hint) {
  homeViewSection.style.display = "none";
  gamePlayViewSection.style.display = "flex";
  gamePlayViewTitle.textContent = `${category} ${type}`;
  gamePlayViewPara.textContent = `6 guesses, ${hint}`;
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

  if (category === "Timed") {
    displayTimer();
    timerContainerDiv.style.display = "flex";
  } else {
    timerContainerDiv.style.display = "none";
    clearInterval(timer);
  }

  if (category === "Learning") {
    hintBtn.style.display = "none";
    getDefinition();
  }
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
  let isLetterCorrect = false;

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
      clearInterval(timer);
      gameEnd(letterArray, "lost");
    }
    //disable the hint btn if guesses less then two
    //hints costs lives, if only one life left, player looses when hint is used
    if ((category === "Medium" || category === "Difficult") && guess < 2) {
      hintBtn.disabled = true;
    }
  }

  //turn arrays in strings in order to compare
  if (guessedLettersArray.toString() === letterArray.toString()) {
    gameEnd([], "won");
    clearInterval(timer);
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
    e.target.classList.add("transparent");
    guessWord(letterClicked);
  }
}

function revealDefinition(definition) {
  definitionContainerDiv.style.display = "block";
  definitionPara.textContent = definition;
}

function displayTimer() {
  let sec = 35;
  timer = setInterval(() => {
    //if less then 10, adds extra 0
    timerSpan.textContent = `00:${sec.toString().padStart(2, "0")}`;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      gameEnd([...wordToGuess], "lost");
    }
  }, 1000);
}

function updateScore() {
  scoreWonSpan.textContent = scoreWon;
  scoreLostSpan.textContent = scoreLost;
}

function drawEyes() {
  dragonEyeDiv.innerHTML = "";
  for (let c = 0; c < 6 - guess; c++) {
    const imgEL = document.createElement("img");
    imgEL.classList.add("eye-closed");
    imgEL.src = "../assets/images/eye-open.svg";
    imgEL.alt = "icon of eye closed";
    dragonEyeDiv.append(imgEL);
  }
  for (let i = 0; i < guess; i++) {
    const imgEL = document.createElement("img");
    imgEL.classList.add("eye-closed");
    imgEL.src = "../assets/images/eye-closed.svg";
    imgEL.alt = "icon of eye closed";
    dragonEyeDiv.append(imgEL);
  }
}

function drawTile(length, targetDiv, array) {
  targetDiv.innerHTML = "";
  if (targetDiv.classList[0] === "word-tile") {
    for (let i = 0; i < length; i++) {
      const div = document.createElement("div");
      div.classList.add("tile");

      if (array) {
        div.textContent = array[i];
      }

      targetDiv.append(div);
    }
  } else {
    for (let i = 0; i < length; i++) {
      const btn = document.createElement("button");
      btn.classList.add("tile");

      if (array) {
        btn.textContent = array[i];
      }

      targetDiv.append(btn);
    }
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
  const jsonUrl = "./data/words.json";
  axios
    .get(jsonUrl)
    .then((res) => {
      const array =
        res.data.modes[category.toLowerCase()]?.all ||
        res.data.categories[category.toLowerCase()];
      wordToGuess = generateRandomWord(array);

      switch (category) {
        case "Easy":
          openGamePlayView(wordToGuess, "Level", "free hint");
          break;
        case "Medium":
          openGamePlayView(wordToGuess, "Level", "hint costs a life");
          break;
        case "Difficult":
          openGamePlayView(wordToGuess, "Level", "hint costs a life");
          break;
        case "Timed":
          openGamePlayView(wordToGuess, "Mode", "free hint");
          break;
        case "Learning":
          openGamePlayView(wordToGuess, "Mode", "no hints");
          break;
        case "Animals":
          openGamePlayView(wordToGuess, "Category", "free hint");
          break;
        case "Gastronomy":
          openGamePlayView(wordToGuess, "Category", "free hint");
          break;
        case "Geography":
          openGamePlayView(wordToGuess, "Category", "free hint");
          break;
        case "Hobbies":
          openGamePlayView(wordToGuess, "Category", "free hint");
          break;
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
      if (res.data.length === 0 || res.data[0].shortdef === undefined) {
        revealDefinition(
          "No luck, adventurer. The hint has vanished into the void."
        );
      } else {
        const definition = res.data[0].shortdef[0];
        if (category === "Medium" || category === "Difficult") {
          guess--;
          drawEyes();
          hintBtn.disabled = true;
        }

        revealDefinition(definition);
      }
    })
    .catch((error) => console.error(error.message));
}

function restartGame() {
  getWord(category);
  guess = 6;
  hintBtn.disabled = false;
}

const defaultScore = {
  easy: {
    won: [],
    lost: [],
  },
  medium: {
    won: [],
    lost: [],
  },
  hard: {
    won: [],
    lost: [],
  },
  timed: {
    won: [],
    lost: [],
  },
  learning: {
    won: [],
    lost: [],
  },
  animals: {
    won: [],
    lost: [],
  },
  gastronomy: {
    won: [],
    lost: [],
  },
  geography: {
    won: [],
    lost: [],
  },
  hobbies: {
    won: [],
    lost: [],
  },
};

//To clean localStorage from Score, replace savedScore with defaultScore
const savedScores =
  JSON.parse(localStorage.getItem("savedScores")) || defaultScore;

window.addEventListener("beforeunload", () => {
  const mapCategory = {
    Easy: "easy",
    Medium: "medium",
    Difficult: "hard",
    Timed: "timed",
    Learning: "learning",
    Animals: "animals",
    Gastronomy: "gastronomy",
    Geography: "geography",
    Hobbies: "hobbies",
  };
  const key = mapCategory[category];
  if (scoreWon > 0) {
    savedScores[key].won.push(scoreWon);
  }
  if (scoreLost > 0) {
    savedScores[key].lost.push(scoreLost);
  }
  localStorage.setItem("savedScores", JSON.stringify(savedScores));
});

function getSum(scoreArray) {
  return scoreArray.reduce((acc, currentValue) => acc + currentValue, 0);
}

if (document.title.includes("Score")) {
  createScoreTable();
}

//Creates the tbody tr, th, td and push in the scores from localStorage
function createScoreTable() {
  for (const categoryName in savedScores) {
    const category = savedScores[categoryName];
    const wonArray = category.won;
    const wonSum = getSum(wonArray);
    const lostArray = category.lost;
    const lostSum = getSum(lostArray);

    const tableRow = document.createElement("tr");
    const tableHeader = document.createElement("th");
    const tableDataWon = document.createElement("td");
    const tableDataLost = document.createElement("td");

    tableHeader.setAttribute("scope", "row");
    tableHeader.textContent = `${categoryName}`;
    tableDataWon.textContent = `${wonSum}`;
    tableDataLost.textContent = `${lostSum}`;

    tableRow.append(tableHeader, tableDataWon, tableDataLost);
    totalWon.push(wonSum);
    totalLost.push(lostSum);

    //Checks if the element exists in the page
    if (tableBody) {
      tableBody.append(tableRow);
    }

    addTotalScoreToTable();
  }
}

function addTotalScoreToTable() {
  if (totalWonTd) {
    totalWonTd.textContent = getSum(totalWon);
  }

  if (totalLostTd) {
    totalLostTd.textContent = getSum(totalLost);
  }
}

// localStorage.clear();
