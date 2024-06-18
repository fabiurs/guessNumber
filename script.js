'use strict'

let userChoice = document.querySelector("#userChoice");
let userButton = document.querySelector("#check");
let message = document.querySelector(".c-message");
let currentScoreElement = document.querySelector("#currentScoreElement");
let highScoreValue = document.querySelector("#highScoreValue"); 
let resetButton = document.querySelector("#resetGame");
let theNumber;
let currentScoreValue;

let getRandomNumber = () => {
    return Math.floor(Math.random() * 20);
}

// function to add a custom message in .c-message box
let showMessage = (messageToShow, classToAdd) =>{
    message.children[0].textContent = messageToShow;
    message.classList = [classToAdd];
}

let startGame = () =>{
    theNumber = getRandomNumber();
    if(!localStorage.getItem("guessMyNumberHighScore")){
        localStorage.setItem("guessMyNumberHighScore", 0);
    }
    if(Number(localStorage.getItem("guessMyNumberHighScore")<currentScoreValue)){
        localStorage.setItem("guessMyNumberHighScore", currentScoreValue)
    }
    highScoreValue.textContent = localStorage.getItem("guessMyNumberHighScore");
    currentScoreValue = 20;
    currentScoreElement.textContent = currentScoreValue;
    resetButton.classList = ["hide"];
    showMessage("", "simple");
    userChoice.value = "";
    //get random number
}



let gameLogic = function(){
    if(userChoice.value && currentScoreValue > 0){
        let userNumber = Number(userChoice.value);
        if(userNumber === theNumber){
            showMessage("Great", "good");
            resetButton.classList = [];
        }
        else if(userNumber < theNumber){
            showMessage("Too low", "simple");
            currentScoreValue--;
            currentScoreElement.textContent = currentScoreValue;
        }
        else{
            showMessage("Too high", "simple");
            currentScoreValue--;
            currentScoreElement.textContent = currentScoreValue;
        }
    }else{
        showMessage("Please enter a value!", "warning");
    }
    if(currentScoreValue === 0){
        showMessage("Game Over", "warning");
        resetButton.classList = [];
    }
}

startGame();
resetButton.addEventListener('click', startGame);
userButton.addEventListener('click', gameLogic);