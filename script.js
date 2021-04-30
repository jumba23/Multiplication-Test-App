let result = '';
let totalCount = '0';
let thisStreak = '0';
let wrongAnswer = '0';
let timerBarWidth = '0';


const smileFaceOne = document.querySelector('#firstPic');
const smileFaceTwo = document.querySelector('#secondPic');
const smileFaceThree = document.querySelector('#thirdPic');

const displayStreak = document.querySelector('#thisStreak');
const displayCount = document.querySelector('#totalCount');
const displayAnswer = document.querySelector('#yourAnswer');
const displayQuestion = document.querySelector('#mathProblem');
const progress = document.getElementById('progressBar');

let timer = setInterval(() =>{
        getRandomNumbers();
        noAnswer();
},5000);

let timePassed = setInterval(timerBar, 25);

function timerBar() {
    console.log(timerBarWidth);
    if (timerBarWidth == 195 || wrongAnswer == 3) {
    clearInterval(timePassed);
    } else {
    timerBarWidth ++; 
    progress.style.width = timerBarWidth + 5; 
    }
}

function getRandomNumbers(){
    const numberOne = Math.floor(Math.random() * 10);
    const numberTwo = Math.floor(Math.random() * 10);
    displayQuestion.value = `${numberOne} x ${numberTwo}`;
    result = numberOne * numberTwo;
}

getRandomNumbers();

function noAnswer(){
    if (displayAnswer.value == '' && wrongAnswer < 2){
        console.log(displayAnswer.value);
        wrongAnswer ++;
        thisStreak = '0';
        timerBarWidth = '0';
        displayStreak.value = thisStreak;
        console.log(wrongAnswer);
        clearInterval(timer);
        clearInterval(timePassed);
        smileFaces();
        getRandomNumbers();
        timePassed = setInterval(timerBar, 25);
        timer = setInterval(() =>{
            getRandomNumbers();
            noAnswer();
        },5000);
    } else {
        clearInterval(timer);
        gameOver();
    }
}

document.querySelector('#answerButton').addEventListener('click',checkAnswer);

function checkAnswer(e){
    e.preventDefault();
    let userAnswer = displayAnswer.value;
    if (userAnswer == result){
        totalCount ++;
        thisStreak ++;
        displayCount.value = totalCount;
        displayStreak.value = thisStreak;
        displayAnswer.value = '';
        timerBarWidth = '0';
        clearInterval(timer);
        clearInterval(timePassed);
        getRandomNumbers();
        timePassed = setInterval(timerBar, 25);
        timer = setInterval(() =>{
            getRandomNumbers();
            noAnswer();
           },5000);
        } else {
            displayStreak.value = '0';
            displayAnswer.value = '';
            thisStreak = '0';
            wrongAnswer ++;
            smileFaces();
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
        gameOver();
        }
}

function gameOver(){
    displayQuestion.value = 'DONE!!';
    clearInterval(timer);
    clearInterval(timePassed);
    smileFaceThree.style.display = 'none';
    }

document.querySelector('#resetButton').addEventListener('click', () => {
            displayStreak.value = '';
            displayCount.value = '';
            displayAnswer.value = '';
            displayQuestion.value = '';
            timerBarWidth = '0';
            result = '';
            wrongAnswer = '0';
            totalCount = '0';
            thisStreak = '0';          
            smileFaceOne.style.display = '';      
            smileFaceTwo.style.display = '';   
            smileFaceThree.style.display = '';
            getRandomNumbers();
            clearInterval(timer);
            clearInterval(timePassed);
            timePassed = setInterval(timerBar, 25);
            timer = setInterval(() =>{
                getRandomNumbers();
                noAnswer();
            },5000);
});
