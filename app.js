/*
- Not properly recording total rounds and ties. Also the play again functionality
is not working either


*/


// Lives/score, output section, and buttons for user interaction
const playerLivesEl = document.getElementById('player-lives');
const computerLivesEl = document.getElementById('computer-lives');
const playerChoiceEl = document.querySelector('.player-choice');
const computerChoiceEl = document.querySelector('.computer-choice');
const gameMessageEl = document.getElementById('game-message');
const userBtns = document.querySelectorAll('.main-btn');


// Elements for updating the game results at the end
const gameResultModal = document.querySelector('.game-results'); 
const gameResultEl = document.getElementById('result');
const playerWinsEl = document.getElementById('player-victories');
const computerWinsEl = document.getElementById('computer-victories');
const totalRoundsEl = document.getElementById('total-rounds');
const numTiesEl = document.getElementById('num-ties');

const newGameBtn = document.querySelector('.play-again');

// Initialize the lives that the user and computer start with
let playerLives = 5;
let computerLives = 5;
let totalRounds = 0;
let playerVictories = 0;
let computerVictories = 0;
let numTies = 0;
let playerChoice;
let computerChoice;
const choices = {
  0: 'Rock',
  1: 'Paper',
  2: 'Scissors'
};


// Generates a choice for the computer
function generateChoice() {
  const randomNumber = Math.floor(Math.random() * 3); //generates a number between 0 - 2
  return choices[randomNumber];    //gets the choice from the object
}

// Decides who wins the round
function decideRound(playerChoice, computerChoice) {
  let result;
  if (playerChoice == computerChoice) { //If they pick the same option
    result = "It's a Tie!";        //For all other cases its either true or false, but here we want to make a distinction that it's a tie for a particular round.
  } else { 
    if (playerChoice== 'Rock') {       //if player picks rock
      if (computerChoice == 'Scissors') {
        computerLives -= 1;
        result = "Player wins the round";
      } else {
        playerLives -= 1;
        result = "Computer wins the round";
      }
    } else if (playerChoice == 'Paper') { //if player picks paper
      if (computerChoice == 'Rock') {
        computerLives -= 1;
        result = "Player wins the round";
      } else {
        playerLives -= 1;
        result = "Computer wins the round";
      }
    } else { //If the player picks Scissors
      if (computerChoice == 'Paper') {
        computerLives -= 1;
        result = "Player wins the round";
      } else {
        playerLives -= 1;
        result = "Computer wins the round";
      }
    }
  }

  // Collects amounts of victories, and amounts of rounds
  if (result == "Player wins the round") {
    playerVictories += 1;
  } else if (result == "Computer wins the round") {
    computerVictories += 1;
  } else {
    console.log('Its a tie');
    numTies += 1;
  }

  totalRounds += 1;
  console.log(`Total rounds ${totalRounds}`);
  return result;
}

// Checks if the game is over
function decideGame() {
  let result;
  if (playerLives == 0) {
    result = "Computer wins!";
  } else if (computerLives == 0) {
    result = "Player wins!";
  } else {
    result = "Game Ongoing";
  }
  return result;

}


// Renders the result of the round or game on screen
// Will update the lives on screen, then it will display an output message depending on who lost or won
function renderGame(result) {
  playerLivesEl.textContent = playerLives;
  computerLivesEl.textContent = computerLives;
  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;

  if ((result == "Computer wins!") || (result == "Player wins!")) {
    gameResultModal.classList.remove('content-hidden');
    gameResultEl.textContent = result;
    totalRoundsEl.textContent = totalRounds;
    playerWinsEl.textContent = playerVictories;
    computerWinsEl.textContent = computerVictories;
    numTiesEl.textContent = numTies;
  } else {
    if (result == "Player wins the round") {
      gameMessageEl.textContent = "You were favorable in the duel!";
    } else if (result == "Computer wins the round") {
      gameMessageEl.textContent = "The computer pulled a sneaky one on ya.";
    } else {
      gameMessageEl.textContent = "Evenly Matched, a tie!";
    }
  }

};

/*
- Call a function that will check the status of the game. If the game hasn't ended, then
send a false, else if it is then send true. 
- This will take us out of the while loop, and finally we call a function that shows 
the match results. Then there will be a button in those match results that can reset the game
and reset lives and other variables
*/
// Event listener that sets user choice, computer choice, and moves the round forward
userBtns.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    playerChoice = e.currentTarget.dataset.id;
    computerChoice = generateChoice();
    let roundResult = decideRound(playerChoice, computerChoice);
    let gameResult = decideGame();
    if (gameResult !== "Game Ongoing") { //if someone has won the game 
      renderGame(gameResult);
    } else {
      renderGame(roundResult);
    }
  })
});

// Will reset everything
newGameBtn.addEventListener('click', function() {
  playerLives = 5;
  computerLives = 5;
  playerVictories = 0;
  computerVictories = 0;
  totalRounds = 0; 
  numTies = 0;
  startGame();
});
// Render lives and starting game message
function startGame() {
  playerLivesEl.textContent = playerLives;
  computerLivesEl.textContent = computerLives;
  playerChoiceEl.textContent = "Player's Choice will be displayed here";
  computerChoiceEl.textContent = "Computer's Choice will be displayed here";
  gameMessageEl.textContent = "Welcome to Rock, Paper, Scissors brought to you by the same people who created cold pencils.";
}

window.addEventListener('DOMContentLoaded', function() {
  startGame();
})