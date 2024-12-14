const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = Array(9).fill(null);
let currentPlayer = 'X';

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    message.textContent = `$
    {currentPlayer} Wins!`;
    return;
  } else if (board.every(cell => cell)) {
    message.textContent = "It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = Player `$
  {currentPlayer}'s Turn`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  message.textContent = Player `$
  {currentPlayer}'s Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);