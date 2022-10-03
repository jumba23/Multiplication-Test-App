// add local memory storage for high scores
// have a timer count down before first math problem is generated - something like a pop-up box
// at the end, if Total count is > high scores value, pop-up window for a user to add their names
let result = "";
let totalCount = "0";
let thisStreak = "0";
let wrongAnswer = "0";
let timerBarWidth = "0";
let localHighScores = [
  { playerName: "", score: "" },
  { playerName: "", score: "" },
  { playerName: "", score: "" },
];

window.onload = () => {
  document.getElementById("yourAnswer").focus();
  createLocalStorage();
};

const storedHighScores = JSON.parse(localStorage.getItem("localHighScores"));

function createLocalStorage() {
  return storedHighScores == null
    ? localStorage.setItem("localHighScores", JSON.stringify(localHighScores))
    : [displayHighScores(storedHighScores) , localHighScores = [...storedHighScores]];
}

function displayHighScores(highScores) {
  console.log(highScores);
  document.getElementById(
    "li-1"
  ).innerHTML = `${highScores[0].playerName} ${highScores[0].score}`;
  document.getElementById(
    "li-2"
  ).innerHTML = `${highScores[1].playerName}  ${highScores[1].score}`;
  document.getElementById(
    "li-3"
  ).innerHTML = `${highScores[2].playerName}  ${highScores[2].score}`;
}

const smileFaceOne = document.querySelector("#firstPic");
const smileFaceTwo = document.querySelector("#secondPic");
const smileFaceThree = document.querySelector("#thirdPic");

const displayStreak = document.querySelector("#thisStreak");
const displayCount = document.querySelector("#totalCount");
const displayAnswer = document.querySelector("#yourAnswer");
const displayQuestion = document.querySelector("#mathProblem");
const progress = document.getElementById("progressBar");

let timer = setInterval(() => {
  getRandomNumbers();
  noAnswer();
}, 5000);

let timePassed = setInterval(timerBar, 25);

function timerBar() {
  if (timerBarWidth == 195 || wrongAnswer == 3) {
    clearInterval(timePassed);
  } else {
    timerBarWidth++;
    progress.style.width = timerBarWidth + 5;
  }
}

function getRandomNumbers() {
  const numberOne = Math.floor(Math.random() * 11);
  const numberTwo = Math.floor(Math.random() * 11);
  displayQuestion.value = `${numberOne} x ${numberTwo}`;
  result = numberOne * numberTwo;
}

window.alert("When ready, press OK");

getRandomNumbers();

function noAnswer() {
  if (displayAnswer.value == "" && wrongAnswer < 2) {
    wrongAnswer++;
    thisStreak = "0";
    timerBarWidth = "0";
    displayStreak.value = thisStreak;
    smileFaces();
    clearInterval(timer);
    clearInterval(timePassed);
    getRandomNumbers();
    timePassed = setInterval(timerBar, 25);
    timer = setInterval(() => {
      getRandomNumbers();
      checkHighScore(displayCount.value);
      noAnswer();
    }, 5000);
  } else {
    gameOver();
  }
}

document.querySelector("#answerButton").addEventListener("click", checkAnswer);

function checkAnswer(e) {
  e.preventDefault();
  let userAnswer = displayAnswer.value;
  if (userAnswer == result) {
    totalCount++;
    thisStreak++;
    displayCount.value = totalCount;
    displayStreak.value = thisStreak;
    displayAnswer.value = "";
    timerBarWidth = "0";
    clearInterval(timer);
    getRandomNumbers();
    timer = setInterval(() => {
      getRandomNumbers();
      checkHighScore(displayCount.value);
      noAnswer();
    }, 5000);
  } else {
    displayStreak.value = "0";
    displayAnswer.value = "";
    thisStreak = "0";
    wrongAnswer++;
    smileFaces();
  }
}

function smileFaces() {
  if (wrongAnswer === 1) {
    smileFaceOne.style.display = "none";
  } else if (wrongAnswer === 2) {
    smileFaceTwo.style.display = "none";
  } else {
    smileFaceThree.style.display = "none";
    gameOver();
  }
}

function checkHighScore(currentCount) {
  localHighScores.find((element, i) => {
    let storedHighScore = element.score;
    if (storedHighScore < currentCount) {
      let newHighScoreName = window.prompt(
        "You made it to high scores list! Enter your name :"
      );
      let newHighScore = { playerName: newHighScoreName, score: currentCount };
      console.log(i)    
      return i === 0
        ? localHighScores.unshift(newHighScore)
        : i === 1
        ? [
            (localHighScores[i + 1] =
              localHighScores[i] , localHighScores.splice(i, 1, newHighScore)),
          ]
        : i === 2? localHighScores[i] = newHighScore : null

    }
    const tempArray = localHighScores.slice(0,3)
    localHighScores = [...tempArray]
  });
  
  localStorage.setItem("localHighScores", JSON.stringify(localHighScores));
  displayHighScores(localHighScores);
}


function gameOver() {
  displayQuestion.value = "DONE!!!";
  checkHighScore(displayCount.value);
  clearInterval(timer);
  clearInterval(timePassed);
  smileFaceThree.style.display = "none";
}

document.querySelector("#resetButton").addEventListener("click", () => {
  displayStreak.value = "";
  displayCount.value = "";
  displayAnswer.value = "";
  displayQuestion.value = "";
  timerBarWidth = "0";
  result = "";
  wrongAnswer = "0";
  totalCount = "0";
  thisStreak = "0";
  smileFaceOne.style.display = "";
  smileFaceTwo.style.display = "";
  smileFaceThree.style.display = "";
  getRandomNumbers();
  clearInterval(timer);
  clearInterval(timePassed);
  timePassed = setInterval(timerBar, 25);
  timer = setInterval(() => {
    getRandomNumbers();
    checkHighScore(displayCount.value);
    noAnswer();
  }, 5000);
});
