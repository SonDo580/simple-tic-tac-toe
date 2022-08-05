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

    return { getBoard, renderBoard, setCell };
})();

gameBoard.renderBoard();


const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return { getName, getMark };
};

const player1 = player('Shadow', 'X');
const player2 = player('Sonic', 'O');


let player1Turn = true; // Shadow will go first

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

    console.log(checkAllDirections(row, column, gameBoard.getBoard(), mark));

    player1Turn = !player1Turn;
}

function checkAllDirections(row, column, board, mark) {
    if (checkHorizontal(row, column, board, mark) >= 5) {
        return 'Game Over!';
    }
    // add other directions
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