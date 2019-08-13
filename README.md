## Tic-Tac-Toe

#### Problem

Write a program that lets two players face off in a game of tic-tac-toe. I'm deliberately leaving this open ended - feel free to use whatever language you wish and whatever technologies best represent your skill set. We've included basic design specs in two formats. These are basic expectations to which your solution should conform but feel free to add other elements as needed to make the game playable.

#### Installation & Usage

Find the link to the live site [here](https://celestelayne.github.io/tic-tac-toe-f52/).

#### Pseudocode

- Set up the variables for the board, squares and reset button
- Add click event listener to the reset button
- When clicked, call the `playNewGame` function
- In the `playNewGame` function, iterate over all the squares and clear the board
- Set the initial turn to 'X' (this assumes the game always starts with X's turn)
- Add click event listener to the square
- When the currentSquare is clicked, place the appropriate letter (whoever’s turn it is) in the square
- Now, use a ternary to switch turns and wrap currentSquare in a `setSquare` function
- Establish the win states
- Check the board against the win states
- Play game and push player moves into the player array
- Compare player moves with win states
- Check for wins, and draw
- Declare winner

#### Initial logic for the main.js & code snippets

1. Set up the variables for the board, squares and button

```javascript
const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const newGameBtn = document.querySelector('button');
```

2. Add event listener to the button:

```javascript
newGameBtn.addEventListener('click', resetBoard)
```

3. Write the `resetBoard()` function:

```javascript
const resetBoard = () => {
  for (i in squares) {
    squares[i].textContent = '';
  }

  playerX = [];
  playerO = [];

  player.textContent = '';

  turn = 'X';
}
```

4. Add event listener to the board (event bubbling)

```javascript
board.addEventListener('click', addPiece);
```

5. Write `addPiece()` function:

```javascript
const addPiece = (e) => {
  e.stopPropagation();
  const currentSquare = e.target;
  if (currentSquare.className === 'square' && currentSquare.textContent === ''){
    setSquare(currentSquare)
  }
  playGame(currentSquare)
}
```

6. Write the `setSquare()` function:

```javascript
const setSquare = (square) => {
  square.innerText = turn;
  turn === 'X' ? turn = 'O' : turn = 'X';
}
```

7. Push the player's moves into empty array, sort (javascript built in method) and pass results to compare function

```javascript
const playGame = (val) => {
  const dataId = val.getAttribute('data-id');

  if (val.textContent === 'X'){
    playerX.push(parseInt(dataId, 10))
    playerX.sort()
  } else if (val.textContent === 'O'){
    playerO.push(parseInt(dataId, 10))
    playerO.sort()
  }

  compare(winStates, playerX, playerO)
}
```

8. Compare each player's array to the win states (array of arrays) and pass results to the checkWIns function.

```javascript
const compare = (arr, playerx, playero) => {

  const player1 = 'Player X';
  const player2 = 'Player O';

  if(playerx.length <= 3 ) {
    const wins = arr.filter(combo => combo.filter(el => {
      return playerx.indexOf(el) > -1;
    }).length == 3);

    checkWins(wins, playerx, player1)
  }

  if(playero.length <= 3 ) {

    const wins = arr.filter(combo => combo.filter(el => {
      return playero.indexOf(el) > -1;
    }).length == 3);

    checkWins(wins, playero, player2)
  }

  if(playerx.length >= 5 || playero.length >= 5) {
    checkSquaresFull();
    setTimeout(() => alert(`we have a draw`), 250);
    return;
  }
}
```

9. Check that all the squares are full for the draw state

```javascript
const checkSquaresFull = () => {
  for (let i in squares) {
    if (squares[i].textContent !== '');
    return true;
  }
  return false;
}
```

10. Check for wins

```javascript
const checkWins = (a, b, c) => {
  if(JSON.stringify(a[0]) === JSON.stringify(b)){
    player.textContent = `${c}`;
    return false;
  }
  return true;
}
```
