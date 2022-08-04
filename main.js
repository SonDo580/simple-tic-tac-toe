const gameBoard = (() => {
    const SIDE = 10;    // the number of squares per side of the board
    const board = [];
    for (let i = 0; i < SIDE; i++) {
        const row = [];
        for (let j = 0; j < SIDE; j++) {
            row.push('X');
        }
        board.push(row);
    }

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector('#gameBoard');

        for (let i = 0; i < SIDE; i++) {
            for (let j = 0; j < SIDE; j++) {
                const cell = document.createElement('div');
                cell.textContent = board[i][j];
                cell.classList.add('cell');
                if (board[i][j] === 'X') {
                    cell.style.color = 'red';
                } else {
                    cell.style.color = 'blue';
                }
                gameBoardDiv.appendChild(cell);
            }
        }
    };

    return {board, renderBoard};
})();

const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark};
};

const player1 = player('Shadow', 'X');
const player2 = player('Sonic', 'O');


gameBoard.renderBoard();