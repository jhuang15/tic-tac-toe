/*----- constants -----*/	
const COMBINATIONS = [
	[0,1,2], //horizontal
	[3,4,5],
	[6,7,8],
	[0,3,6], //vertical
	[1,4,7],
	[2,5,8],
	[0,4,8], //diagonal
	[2,4,6]
];

/*----- app's state (variables) -----*/
let board; //An array of the board tiles
let currentPlayer; //default player is X
let gameStatus; // 'W' -> Win; 'L' -> Loss; 'CAT' -> tie; null -> game in progress

/*----- cached element references -----*/
const boardDiv = document.querySelectorAll('.cell');
const msgEl = document.querySelector('h1');
const restartBtn = document.querySelector('button');


/*----- event listeners -----*/
restartBtn.addEventListener('click', init);



/*----- functions -----*/
init();

function init() {
	board = [null, null, null, null, null, null, null, null, null];
	gameStatus = null;
	currentPlayer = 'X'
	
	render();
}

function render () {
	renderBoardCells();//will not work if not called before msg
	renderMsg(); //FUNCTION NOT WORKING
	
}

function renderBoardCells() {
	// This function will loop through array to listen when clicked
	board = Array.from(boardDiv); //convert board nodelist to array 
	board.forEach(function (cell){
		cell.addEventListener('click', function (){
			if(cell.innerText.trim() != '') return
			cell.innerText = currentPlayer;
			checkWinner();
			//ternary syntax --> condition ? exprIfTrue : experIfFalse
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		});
	});
}

function renderMsg() {
	if (gameStatus === 'W') {
    msgEl.innerText = 'X WON!';
  } else if (gameStatus === 'L') {
    msgEl.innerText = "O WON!";
	} else if (gameStatus === 'CAT') {
		msgEl.innerText = "TIE!";
  } else {
    msgEl.innerText = `${MAX_WRONG_GUESSES - wrongLetters.length + 1} wrong guesses remain - good luck`;
  }
}

function checkWinner(){ 
	 COMBINATIONS.forEach(function(combo){
		let check = combo.every(idx => board[idx].innerText.trim() === currentPlayer)
			if(check) {
				highlightCell(combo);
		} 
	 });

}

//Function to highlight winning cells by taking index of winning combindations and adding 'highlight' class
function highlightCell(combination){
	combination.forEach(function(idx){
		board[idx].classList.add('highlight');
	});
	
}
