const gameBoard = (() => {
    const board = [];
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            board.push('');
        }
    }

    return {board};
})();

console.log(gameBoard.board);