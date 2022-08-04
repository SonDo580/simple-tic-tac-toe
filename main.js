const gameBoard = (() => {
    const SIDE = 20;    // the number of squares per side of the board
    const board = [];
    for (let i = 0; i < SIDE; i++) {
        const row = [];
        for (let j = 0; j < SIDE; j++) {
            row.push('');
        }
        board.push(row);
    }

    // const renderBoard = () => {
    //     const gameBoardDiv = document.querySelector('#gameBoard');

    //     for (let mark of board) {
    //         const cell = document.createElement('div');
    //         cell.textContent = mark;

    //     }
    // }

    return {board};
})();

console.log(gameBoard.board);
