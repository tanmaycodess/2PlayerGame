'use strict'

// selecting player
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');


// scores shall be zero initially
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');


// disapear the dice initially
const diceEl = document.querySelector('.dice');

// rolling dice 
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score,scores,activePlayer,playing;

const toStartPlay = function() {


    // state of game
     playing = true;

    // score initially
     score = 0;

    // array for storing scores
     scores = [0, 0];

    // active player ( 0 for p1 and 1 for p2)
     activePlayer = 0;

    score0.textContent = 0;
    score1.textContent = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');


    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.add('player--active');
    player1.classList.remove('player--active');

};


toStartPlay();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // converting the score to zero
    activePlayer = activePlayer === 0 ? 1 : 0;
    score = 0;

    // switching transition
    //toggle method adds the class if it is not there and remove the class if it is present
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function () {
    if (playing) {

        // 1. generating random dice roll and then display it and check for 1
        // 2. if 1 switch player

        // generating dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;


        // check for 1, if then switch player
        if (dice !== 1) {
            score += dice;

            document.getElementById(`current--${activePlayer}`).textContent = score;
        }
        else {
            // switch player
            switchPlayer();
        }

    }
});


btnHold.addEventListener('click', function () {
    if (playing && !diceEl.classList.contains('hidden')) {

        // add current score to active players score
        // check if score is atleast 100 , if finish the game else switch player

        scores[activePlayer] += score;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if score is 100

        if (scores[activePlayer] >= 50) {

            // finish game

            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }

        // switch player
        switchPlayer();

    }
});


btnNew.addEventListener('click', toStartPlay)