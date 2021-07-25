function isSudokuBoardValid(board) {
    if (board.length !== 81) {
        return false;
    }

    for (let element of board) {
        if (!(element >= 0 && element <= 9)) {
            return false;
        }
    }

    //Check if any number repeats in some row
    for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        let rowNumbers = [];
        for (let colIdx = 0; colIdx < 9; colIdx++) {
            let value = board[rowIdx * 9 + colIdx];
            if (value !== 0) {
                rowNumbers.push(value);
            }
        }
        rowNumbers.sort((a, b) => a - b)
        for (let i = 0; i < rowNumbers.length - 1; i++) {
            if (rowNumbers[i] === rowNumbers[i + 1]) {
                return false;
            }
        }
    }

    //Check if any number repeats in some column
    for (let colIdx = 0; colIdx < 9; colIdx++) {
        let colNumbers = [];
        for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
            let value = board[rowIdx * 9 + colIdx];
            if (value !== 0) {
                colNumbers.push(value);
            }
        }
        colNumbers.sort((a, b) => a - b);
        for (let i = 0; i < colNumbers.length - 1; i++) {
            if (colNumbers[i] === colNumbers[i + 1]) {
                return false;
            }
        }
    }

    //Check if any number repeats in some box
    let boxesStartIndices = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]]
    for (let [rowIdx, colIdx] of boxesStartIndices) {
        let boxNumbers = [];
        for (let rDelta = 0; rDelta < 3; rDelta++) {
            for (let cDelta = 0; cDelta < 3; cDelta++) {
                let value = board[(rowIdx + rDelta) * 9 + (colIdx + cDelta)]
                if (value !== 0) {
                    boxNumbers.push(value);
                }
            }
        }
        boxNumbers.sort((a, b) => a - b);
        for (let i = 0; i < boxNumbers.length - 1; i++) {
            if (boxNumbers[i] === boxNumbers[i + 1]) {
                return false;
            }
        }
    }

    return true;
}

function isValidMove(board, row, col, num) {
    if (!(num >= 1 && num <= 9)) {
        return false;
    }
    if (board[row * 9 + col] === 0) {
        let newBoard = board.slice();
        newBoard[row * 9 + col] = num;
        return isSudokuBoardValid(newBoard);
    } else {
        return false;
    }

}

function findEmptyPos(board) {
    for (let rowIdx = 0; rowIdx < 9; rowIdx++){
        for (let colIdx = 0; colIdx < 9; colIdx++) {
            if (board[rowIdx * 9 + colIdx] === 0) {
                return [rowIdx, colIdx];
            }
        }
    }
    return null;
}

function solveSudokuPuzzle(board) {
    let emptyPos = findEmptyPos(board);
    if (emptyPos === null) {
        return true;
    }
    let row = emptyPos[0];
    let col = emptyPos[1];

    for (let n = 1; n <= 9; n++) {
        if (isValidMove(board, row, col, n)) {
            board[row * 9 + col] = n;

            if (solveSudokuPuzzle(board)) {
                return true;
            }

            board[row * 9 + col] = 0;
        }
    }

    return false;
}

export {isSudokuBoardValid, isValidMove, findEmptyPos, solveSudokuPuzzle}