'use strict';

// document.querySelector('.score').textContent = 10;
// document.querySelector('.number').textContent = 13;

// //Input value
// document.querySelector('.guess').value = 12;
// console.log(document.querySelector('.guess').value);

const updateScore = function () {
  if (score < 0) score = 0;
  if (score === 0) displayMessage('You lost.');
  document.querySelector('.score').textContent = score;
};

const updateHighscore = function () {
  document.querySelector('.highscore').textContent = highScore;
};

const displayMessage = function (messsage) {
  document.querySelector('.message').textContent = messsage;
};

const resetGame = function () {
  // Returns a random integer from 1 to 20:
  secretNumber = Math.floor(Math.random() * 20) + 1;
  console.log(secretNumber);
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  updateScore();
  updateHighscore();
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (isNaN(guess) || guess <= 0) {
    displayMessage('Please enter a valid number.');
  } else {
    if (guess === secretNumber) {
      displayMessage('Corect number!');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = secretNumber;
      if (score > highScore) {
        highScore = score;
        updateHighscore();
      }
    } else if (guess > secretNumber) {
      score--;
      displayMessage('Too high.');
    } else {
      /*(guess < scretNumber)*/
      score--;
      displayMessage('Too low.');
    }
    updateScore();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});

let secretNumber;
let highScore = 0;
let score = 20;
resetGame();
