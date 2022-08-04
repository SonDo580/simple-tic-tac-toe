const gameBoard = (() => {
    const SIDE = 10;    // the number of squares per side of the board
    const board = [];
    for (let i = 0; i < SIDE; i++) {
        const row = [];
        for (let j = 0; j < SIDE; j++) {
            row.push('');
        }
        board.push(row);
    }

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector('#gameBoard');

        for (let i = 0; i < SIDE; i++) {
            for (let j = 0; j < SIDE; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                gameBoardDiv.appendChild(cell);
            }
        }
    };

    return {board, renderBoard};
})();

console.log(gameBoard.board);
