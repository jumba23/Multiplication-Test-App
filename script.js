let result = '';
let totalCount = '0';
let thisStreak = '0';
let wrongAnswer = '0';


const smileFaceOne = document.querySelector('#firstPic');
const smileFaceTwo = document.querySelector('#secondPic');
const smileFaceThree = document.querySelector('#thirdPic');

const displayStreak = document.querySelector('#thisStreak');
const displayCount = document.querySelector('#totalCount');
const displayAnswer = document.querySelector('#yourAnswer');
const displayQuestion = document.querySelector('#mathProblem');


function getRandomNumbers(){
    const numberOne = Math.floor(Math.random() * 10);
    const numberTwo = Math.floor(Math.random() * 10);
    displayQuestion.value = `${numberOne} x ${numberTwo}`;
    result = numberOne * numberTwo;
 }



let timer = setInterval(() =>{
        getRandomNumbers();
        remainingTime();
        noAnswer();
},5000);

getRandomNumbers();
remainingTime();

document.querySelector('#answerButton').addEventListener('click',checkAnswer);

function noAnswer(){
    if (displayAnswer.value == '' && wrongAnswer < 2){
        console.log(displayAnswer.value);
        wrongAnswer ++;
        thisStreak = '0';
        displayStreak.value = thisStreak;
        console.log(wrongAnswer);
        smileFaces();
        getRandomNumbers();
        clearInterval(timer);
        timer = setInterval(() =>{
            remainingTime()
            getRandomNumbers();
            noAnswer();
        },5000);
    } else {
        clearInterval(timer);
        gameOver();
    }
}

function checkAnswer(e){
    e.preventDefault();
    let userAnswer = displayAnswer.value;
    if (userAnswer == result){
        totalCount ++;
        thisStreak ++;
        displayCount.value = totalCount;
        displayStreak.value = thisStreak;
        displayAnswer.value = '';
        getRandomNumbers();
        clearInterval(timer);
        timer = setInterval(() =>{
            getRandomNumbers();
            noAnswer();
            remainingTime();
        },5000);
        } else {
            displayStreak.value = '0';
            displayAnswer.value = '';
            thisStreak = '0';
            wrongAnswer ++;
            smileFaces();
         }            
}    

function remainingTime() {
    let progress = document.getElementById('progressBar');   
    let width = 0;
    let timePassed = setInterval(bar, 25);
    function bar() {
        console.log(width);
      if (width == 195) {
        clearInterval(timePassed);
      } else {
        width ++; 
        progress.style.width = width + 5; 
       }
    }
 }


function smileFaces(){
    if(wrongAnswer === 1){
        console.log(wrongAnswer);
        smileFaceOne.style.display = 'none';
    } else if (wrongAnswer === 2){
        console.log(wrongAnswer);
        smileFaceTwo.style.display = 'none';
    } else {
        console.log(wrongAnswer);
        smileFaceThree.style.display = 'none';
        }
}

function gameOver(){
    displayQuestion.value = 'GAME OVER!!!!';
    clearInterval(timer);
    smileFaceThree.style.display = 'none';
    }

document.querySelector('#resetButton').addEventListener('click', () => {
            displayStreak.value = '';
            displayCount.value = '';
            displayAnswer.value = '';
            displayQuestion.value = '';
            result = '';
            wrongAnswer = '0';
            totalCount = '0';
            thisStreak = '0';          
            smileFaceOne.style.display = '';      
            smileFaceTwo.style.display = '';   
            smileFaceThree.style.display = '';
            getRandomNumbers();
            remainingTime();
            clearInterval(timer);
            timer = setInterval(() =>{
                getRandomNumbers();
                remainingTime()
                noAnswer();
            },5000);
});

// const playGame = () => {
//     setInterval(function () {
//         drawGameBoard();
//         drawApple();
//         drawBody();
//         drawHead();
//         boundaryCheck();
//         appleCheck();
//         bodyCheck();
//         checkGameOver();
//     }, 1000 / FRAMES_PER_SECOND);
//     getRandomApplePos();
// }

// window.onload = () => {
//     getRandomNumbers();
// }