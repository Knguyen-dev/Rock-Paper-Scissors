// Lives/score, output section that shows what each player picked, and buttons for user interaction
const playerLivesEl = document.getElementById('player-lives');
const computerLivesEl = document.getElementById('computer-lives');
const playerChoiceEl = document.querySelector('.player-choice');
const computerChoiceEl = document.querySelector('.computer-choice');
const gameMessageEl = document.getElementById('game-message');
const userBtns = document.querySelectorAll('.main-btn');

// Elements for updating the game results at the end
const gameResultsModal = document.querySelector('.game-results'); 
const gameResultEl = document.getElementById('result');     
const playerWinsEl = document.getElementById('player-victories');
const computerWinsEl = document.getElementById('computer-victories');
const totalRoundsEl = document.getElementById('total-rounds');
const numTiesEl = document.getElementById('num-ties');
const newGameBtn = document.querySelector('.play-again');

// Initialize the lives that the user and computer start with;
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
  return choices[randomNumber];    //use that random number to access a property from the 'choices' object, which effectively yields rock, paper, or scissors
}

// Decides who wins an individual round
function decideRound(playerChoice, computerChoice) {
  let result;
  if (playerChoice == computerChoice) { //If both pick the same option, then it's a tie 
    result = "It's a Tie!";        
  } else { 
    if (playerChoice== 'Rock') {       //if player picks rock then the computer loses when picking scissors
      if (computerChoice == 'Scissors') {
        computerLives -= 1;
        result = "Player wins the round";
      } else {    //This would mean the computer picked paper, which means the player would lose. The computer can't have rock here because that was checked in the former conditional
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
    numTies += 1;
  }
  //Continues to add on the amount of rounds being played 
  totalRounds += 1;
  return result; //returns the result of the round, which is who won it.
}

// Checks if either the computer or the player won the game
function decideGame() {
  let result;
  if (playerLives == 0) { //if the player has no lives left then the computer won against them
    result = "Computer wins!";
  } else if (computerLives == 0) { //otherwise if the computer has no lives left, then the player won
    result = "Player wins!";
  } else {  //Else, both have lives left so the game is still ongoing.
    result = "Game Ongoing";
  } //Return this result 
  return result;

}


// Renders the result of the round/game on screen
function renderGame(result) {
  // Updates the lives
  playerLivesEl.textContent = playerLives;
  computerLivesEl.textContent = computerLives;
  
  //Displays what the user and the computer picked 
  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;

  // If this conditional is true, then either the computer or the player has won the entire game
  if ((result == "Computer wins!") || (result == "Player wins!")) {
    gameResultsModal.classList.remove('content-hidden'); //Show the game results modal that will show the stats and results of the game
    gameResultEl.textContent = result;        //Shows whether the computer or the player won

    // Shows statistics such as the total rounds played, number of wins, etc.
    totalRoundsEl.textContent = totalRounds;  
    playerWinsEl.textContent = playerVictories;
    computerWinsEl.textContent = computerVictories;
    numTiesEl.textContent = numTies;
  } else { //Else, either the player or computer won a round, but not the entire game. Then render a game message saying whether the player won, lost, or tied with the computer
    if (result == "Player wins the round") {
      gameMessageEl.textContent = "You were favorable in the duel!";
    } else if (result == "Computer wins the round") {
      gameMessageEl.textContent = "The computer pulled a sneaky one on ya.";
    } else {
      gameMessageEl.textContent = "Evenly Matched, a tie!";
    }
  }
};

// Render the remaining lives of the players and starting game message
function startGame() {
  playerLivesEl.textContent = playerLives;
  computerLivesEl.textContent = computerLives;
  playerChoiceEl.textContent = "Player's Choice will be displayed here";
  computerChoiceEl.textContent = "Computer's Choice will be displayed here";
  gameMessageEl.textContent = "Welcome to Rock, Paper, Scissors brought to you by the same people who created cold pencils.";
}

// Starts game when webpage is loaded
window.addEventListener('DOMContentLoaded', function() {
  startGame();
})

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
  gameResultsModal.classList.add('content-hidden');
  startGame();
});