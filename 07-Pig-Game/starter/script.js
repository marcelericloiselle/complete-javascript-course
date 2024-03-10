'use strict';

const updateTotalScores = function () {
  document.querySelector('#score--0').textContent = totalScore[0];
  document.getElementById('score--1').textContent = totalScore[1];
};

const resetCurrentScore = function () {
  currentScore = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
};

const resetTotalScore = function () {
  totalScore[0] = 0;
  totalScore[1] = 0;
  updateTotalScores();
};

const switchPlayers = function () {
  activePlayer = activePlayer === 1 ? 0 : 1;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

const newGame = function () {
  console.log('newGame');
  activePlayer = 0;
  totalScore = [0, 0];
  playing = true;
  diceEl.classList.add('hidden');
  resetCurrentScore();
  resetTotalScore();
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
};

const rollDice = function () {
  console.log('rollDice');
  if (playing) {
    dice = Math.floor(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice === 1) {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      switchPlayers();
    } else {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

const holdScore = function () {
  console.log('hold');
  if (playing) {
    totalScore[activePlayer] += currentScore;
    updateTotalScores();
    currentScore = 0;
    resetCurrentScore();

    if (totalScore[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayers();
    }
  }
};

const diceEl = document.querySelector('.dice');

let activePlayer, dice, totalScore, currentScore, playing;

const btnNew = document.querySelector('.btn--new');
btnNew.addEventListener('click', newGame);
const btnRoll = document.querySelector('.btn--roll');
btnRoll.addEventListener('click', rollDice);
const btnHold = document.querySelector('.btn--hold');
btnHold.addEventListener('click', holdScore);

//Initialization
newGame();
