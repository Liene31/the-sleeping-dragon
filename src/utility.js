//check if elements exists on the page
export function checkIfElExists(selector, event, handler) {
  if (selector) {
    selector.addEventListener(event, handler);
  }
}

function generateRandomNum(length) {
  return Math.floor(Math.random() * length);
}

export function generateRandomWord(array) {
  const randomNum = generateRandomNum(array.length);
  const randomWord = array[randomNum];
  return randomWord;
}

//calculate the sum in the score page for each category and for total
export function getSum(scoreArray) {
  return scoreArray.reduce((acc, currentValue) => acc + currentValue, 0);
}
