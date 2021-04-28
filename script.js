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

const timer = setInterval(getRandomNumbers, 5000);

function getRandomNumbers (){
    const numberOne = Math.floor(Math.random() * 10);
    console.log(numberOne);
    const numberTwo = Math.floor(Math.random() * 10);
    console.log(numberTwo);
    document.querySelector('#mathProblem').value = `${numberOne} x ${numberTwo}`;
    result = numberOne * numberTwo;
    console.log(result);
    return numberOne, numberTwo;
}

getRandomNumbers()

document.querySelector('#answerButton').addEventListener('click',checkAnswer);

function checkAnswer(e){
    e.preventDefault();
    let userAnswer = displayAnswer.value;
    if (userAnswer == result){
        totalCount ++;
        displayCount.value = totalCount;
        thisStreak ++;
        displayStreak.value = thisStreak;
        displayAnswer.value = '';
        clearInterval(timer);
        getRandomNumbers();
        } else if (userAnswer === ''){
            wrongAnswer ++;
            smileFaces();
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
        smileFaceOne.style.display = 'none';
    } else if (wrongAnswer === 2){
        smileFaceTwo.style.display = 'none';
    } else {
        smileFaceThree.style.display = 'none';
        gameOver();
        clearInterval(timer);
    }

}

function gameOver(){
    displayQuestion.value = 'GAME OVER!!!!'
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
            clearInterval(timer);
            setInterval(getRandomNumbers, 5000);
});

