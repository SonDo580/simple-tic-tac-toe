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

    const getCell = (row, column) => {
        return board[row][column];
    };

    const setCell = (row, column, mark) => {
        board[row][column] = mark;
    }

    return {getBoard, renderBoard, getCell, setCell};
})();

gameBoard.renderBoard();


const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark};
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

    if (player1Turn) {        
        gameBoard.setCell(row, column, player1.getMark());

        cell.textContent = player1.getMark();
        cell.style.color = 'red';

        isGameOver(row, column, gameBoard.getBoard(), player1.getMark());
    } else {
        gameBoard.setCell(row, column, player2.getMark());

        cell.textContent = player2.getMark();
        cell.style.color = 'blue';

        isGameOver(row, column, gameBoard.getBoard(), player2.getMark());
    }
    player1Turn = !player1Turn;
}

function isGameOver(row, column, board, mark) {
    let currentRow = row;
    let currentColumn = column;
    let markNumber = 1;      

    // Search left
    // while (--currentColumn >= 0) {
    //     if (board[currentRow][currentColumn] !== mark) {
    //         break;
    //     }
    //     markNumber++;
    // }
    
    // // Search right
    // currentColumn = column;
    // while (++currentColumn < SIDE) {
    //     if (board[currentRow][currentColumn] !== mark) {
    //         break;
    //     }
    //     markNumber++;
    // }

    // console.log(markNumber);
}