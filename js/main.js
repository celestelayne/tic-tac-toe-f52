console.log('this works!');

// 0 | 1 | 2
//---+---+---
// 3 | 4 | 5
//---+---+---
// 6 | 7 | 8

// global variables

const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const newGameBtn = document.querySelector('button');

const player = document.querySelector('#player-score');


let playerX = [];
let playerO = [];

let turn = 'X';

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

// functions

const resetBoard = () => {
  console.log('clicked')
  // remove all the Xs & Os from the squares
  for (i in squares) {
    squares[i].textContent = ''
  }

  // reset player arrays
  playerX = [];
  playerO = [];

  // set initial turn to 'X'
  turn = 'X';
}

const setSquare = (square) => {

  // create svg element and append to each square
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "98");
  svg.setAttribute("height", "98");
  square.appendChild(svg);

  // create a circle and set attributes
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "42");
  circle.setAttribute("cy", "42");
  circle.setAttribute("r", "31");
  circle.setAttribute("stroke", "#2D4558");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", "none");

  // create a crossmark and set attributes
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "10");
  line.setAttribute("y1", "10");
  line.setAttribute("x2", "10");
  line.setAttribute("y2", "10");
  line.setAttribute("stroke", "#2D4558");
  line.setAttribute("stroke-width", "3");

  console.log(turn)

  square.innerText = turn;
  turn === 'X' ? turn = 'O' : turn = 'X';

}

const addPiece = (e) => {
  // Prevents the event from bubbling up to the board,
  // but does not prevent clicking on other squares,
  // so the event is only registered by the element clicked.
  e.stopPropagation()

  let currentSquare = e.target;

  if (currentSquare.className === 'square'){
    setSquare(currentSquare)
  }

  // pass the current square to the game logic
  playGame(currentSquare)
}

const playGame = (val) => {

  // grab 'data-id' attribute for each square
  let dataId = val.getAttribute('data-id')

  if (val.textContent === 'X'){

    playerX.push(parseInt(dataId))
    playerX.sort()
  } else if (val.textContent === 'O'){

    playerO.push(parseInt(dataId))
    playerO.sort()
  }

  // pass win states array,  player 'X' and player 'O' plays into compare function
  compare(winStates, playerX, playerO)
  // console.log('player x:', p1counter, 'player o:', p2counter)
}

const compare = (arr, playerx, playero) => {
  let player1, player2;

  if(playerx.length <= 3 ) {
    player1 = `Player X`
    let wins = arr.filter(combo => combo.filter(el => {
      return playerx.indexOf(el) > -1;
    }).length == 3);
    // console.log(wins, playerx)
    checkWins(wins, playerx, player1)
  }

  if(playero.length <= 3 ) {
    player2 = `Player O`
    let wins = arr.filter(combo => combo.filter(el => {
      return playero.indexOf(el) > -1;
    }).length == 3);

    checkWins(wins, playero, player2)
  }

  // if there is a draw
  if(playerx.length >= 5 || playero.length >= 5) {
    setTimeout(() => alert(`we have a draw`), 250);
    return;
  }
}


const checkWins = (a, b, c) => {

    // console.log(a, b)

    if(JSON.stringify(a[0]) === JSON.stringify(b)){
      // setTimeout(() => alert(`${c} wins`), 250);
      player.textContent = `${c}`
      return false;
    }

}

// event handlers

newGameBtn.addEventListener('click', resetBoard, false)
board.addEventListener('click', addPiece)
