'use strict';

// DOM Elements
const dice = document.querySelector('.dice');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const btns = document.querySelectorAll('.btn')
// Global variables
const playerScores = [0, 0];
let diceRoll = Math.trunc(Math.random() * 6 + 1);
let currentScore = 0;
let activePlayer = 0;
let winnerFound = false;

// Starting conditions 
const init = () => {
    activePlayer = 0;
    player1.classList.add('player--active');
    player2.classList.remove('player--active')
    currentScore = 0;
    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;
    playerScores[0] = 0;
    playerScores[1] = 0;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    document.querySelector('.btn--roll').style.display = 'block';
    document.querySelector('.btn--hold').style.display = 'block';
    winnerFound = false;
    dice.style.display = 'none';
}
init();

// Button handler, adds event listeners for each button
btns.forEach(e => e.addEventListener('click', () => {
    if (e.className === 'btn btn--new') init(); // reset game

    if (e.className === 'btn btn--hold') { // hold dice score, update total score 
        updateTotalScore();
        switchPlayer();
        checkWinCondition();
    }

    if (e.className === 'btn btn--roll') {
        diceRoll = Math.trunc(Math.random() * 6 + 1); // roll the dice
        diceHandler(diceRoll); // updates dice image based on the RNG

        if (diceRoll === 1) switchPlayer();
        else updateCurrentScore();
        checkWinCondition();
    }
}));

// Win condition handler
const checkWinCondition = () => {
    if (playerScores[0] >= 100) {
        player1.classList.add('player--winner');
        player2.classList.remove('player--active');
        winnerFound = true;
    } else if (playerScores[1] >= 100) {
        player2.classList.add('player--winner');
        player1.classList.remove('player--active');
        winnerFound = true;
    };

    if (winnerFound) {
        document.querySelector('.btn--roll').style.display = 'none';
        document.querySelector('.btn--hold').style.display = 'none';
    }
}
// Score update handler
const updateCurrentScore = () => {
    if (currentPlayer().className === player2.className) {
        currentScore += diceRoll;
        current2.textContent = currentScore;
    } else {
        currentScore += diceRoll;
        current1.textContent = currentScore;
    }
}

// Returns active player
const currentPlayer = () => {
    if (activePlayer === 0) return player1;
    else return player2;
}

// Player switch handler
const switchPlayer = () => {
    currentScore = 0;
    if (activePlayer === 0) {
        activePlayer = 1;
        current1.textContent = 0;
        player1.classList.remove('player--active');
        player2.classList.add('player--active')
    } else {
        activePlayer = 0;
        current2.textContent = 0;
        player2.classList.remove('player--active');
        player1.classList.add('player--active')
    }
}

// Score update handler
const updateTotalScore = () => {
    if (activePlayer === 0) {
        playerScores[0] += currentScore;
        score1.textContent = playerScores[0];
    } else {
        playerScores[1] += currentScore;
        score2.textContent = playerScores[1];
    }
}

// Dice roll handler
const diceHandler = (num) => {
    dice.src = `img/dice-${num}.png`
    dice.style.display = 'block';
}