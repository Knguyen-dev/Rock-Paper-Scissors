// Lives/score, output section, and buttons for user interaction
const userLivesEl = document.getElementById('user-lives');
const computerLivesEl = document.getElementById('computer-lives');
const outputSection = document.getElementById('output-event');
const userBtns = document.querySelectorAll('.main-btn');

// Elements for updating the game results at the end
const gameResultModal = document.querySelector('.game-results'); 
const newGameBtn = document.querySelector('.play-again');

// Initialize the lives that the user and computer start with
let userLives = 5;
let computerLives = 5;
let game_finished = false;
let playerChoice;
let computerChoice;

/*
- Loop or continue while the game hasn't ended (while player a or b has lives > 0) or boolean
- Prompt the user for a pick between rock, paper, and scissors; buttons
- Call function that will generate computer choice; generates number between 0 - 2 and that decides a choice from an object
- Then call a function that decides the round with both of their choices as args
- Make conditions based on the player's choice, whether rock paper or scissors 
- If player wins, then minus 1 from computer lives, and vice versa; check for a tie too
- With this result, call a function that will explain what happened, like players tied, or someone 
won or computer lost, etc. 

- Call a function that will check the status of the game. If the game hasn't ended, then
send a false, else if it is then send true. 
- This will take us out of the while loop, and finally we call a function that shows 
the match results. Then there will be a button in those match results that can reset the game
and reset lives and other variables
*/