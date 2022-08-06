const SIDE = 10;    // the number of squares per side of the board

const gameBoard = (() => {
    const board = [];
    for (let i = 0; i < SIDE; i++) {
        const row = [];
        for (let j = 0; j < SIDE; j++) {
            row.push('');
        }
        board.push(row);
    }

    const getBoard = () => {
        return board;
    }

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector('#gameBoard');

        for (let i = 0; i < SIDE; i++) {
            for (let j = 0; j < SIDE; j++) {
                const cell = document.createElement('div');
                cell.textContent = board[i][j];
                cell.classList.add('cell');

                cell.setAttribute('data-row', i);
                cell.setAttribute('data-column', j);

                if (board[i][j] === 'X') {
                    cell.style.color = 'red';
                } else {
                    cell.style.color = 'blue';
                }

                cell.addEventListener('click', addMark);

                gameBoardDiv.appendChild(cell);
            }
        }
    };

    const setCell = (row, column, mark) => {
        board[row][column] = mark;
    }

    const getCell = (row, column) => {
        return board[row][column];
    }

    return { getBoard, renderBoard, setCell, getCell };
})();

gameBoard.renderBoard();


const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    const renderPlayer = () => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `${name}: ${mark}`;

        return playerDiv;
    };

    return { getName, getMark, renderPlayer };
};

const player1 = player('Shadow', 'X');
const player2 = player('Sonic', 'O');

const playersDiv = document.querySelector('#players');
playersDiv.appendChild(player1.renderPlayer());
playersDiv.appendChild(player2.renderPlayer());


let player1Turn = true;     // player1 will go first
let lastCell = null;       

function addMark(event) {
    const cell = event.target;
    if (cell.textContent !== '') {
        return;
    }

    const row = cell.getAttribute('data-row');
    const column = cell.getAttribute('data-column');

    let mark = '';
    let color = '';
    if (player1Turn) {
        mark = player1.getMark();
        color = 'red';
    } else {
        mark = player2.getMark();
        color = 'blue';
    }

    gameBoard.setCell(row, column, mark);
    cell.textContent = mark;
    cell.style.color = color;

    if (lastCell !== null) {
        lastCell.classList.remove('highlight');
    }
    cell.classList.add('highlight');

    

    // Set up the next turn
    lastCell = cell;
    player1Turn = !player1Turn;
}

function isGameOver(row, column, board, mark) {
    const markNumber = checkAllDirections(...arguments);

    for (let key in markNumber) {
        if (markNumber[key] >= 5) {
            return true;
        }
    }

    return false;
}

function checkAllDirections(row, column, board, mark) {
    const markNumber = {
        horizontal : checkHorizontal(...arguments),
        vertical: checkVertical(...arguments),
        northwest_southeast: checkNorthWest_SouthEast(...arguments),
        northeast_southwest: checkNorthEast_SouthWest(...arguments)
    };

    return markNumber;
}

function checkHorizontal(row, column, board, mark) {
    let markNumber = 1;
    let currentColumn = column;

    while (--currentColumn >= 0) {
        if (board[row][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    currentColumn = column;
    while (++currentColumn < SIDE) {
        if (board[row][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    return markNumber;
}

function checkVertical(row, column, board, mark) {
    let markNumber = 1;
    let currentRow = row;

    while (--currentRow >= 0) {
        if (board[currentRow][column] !== mark) {
            break;
        }
        markNumber++;
    }

    currentRow = row;
    while (++currentRow < SIDE) {
        if (board[currentRow][column] !== mark) {
            break;
        }
        markNumber++;
    }

    return markNumber;
}

function checkNorthWest_SouthEast(row, column, board, mark) {
    let markNumber = 1;
    let currentRow = row;
    let currentColumn = column;

    while (--currentRow >= 0 && --currentColumn >= 0) {
        if (board[currentRow][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    currentRow = row;
    currentColumn = column;
    while (++currentRow < SIDE && ++currentColumn < SIDE) {
        if (board[currentRow][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    return markNumber;
}

function checkNorthEast_SouthWest(row, column, board, mark) {
    let markNumber = 1;
    let currentRow = row;
    let currentColumn = column;

    while (--currentRow >= 0 && ++currentColumn < SIDE) {
        if (board[currentRow][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    currentRow = row;
    currentColumn = column;
    while (++currentRow < SIDE && --currentColumn >= 0) {
        if (board[currentRow][currentColumn] !== mark) {
            break;
        }
        markNumber++;
    }

    return markNumber;
}