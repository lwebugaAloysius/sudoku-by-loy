// import { board } from "./board";

// [
//   [0, 0, 2, 8, 0, 4, 7, 5, 0],
//   [7, 4, 0, 0, 0, 1, 0, 0, 0],
//   [5, 6, 0, 0, 2, 7, 0, 4, 3],
//   [2, 0, 3, 5, 0, 0, 6, 1, 4],
//   [0, 0, 5, 2, 0, 0, 3, 0, 0],
//   [4, 8, 6, 7, 1, 3, 5, 0, 2],
//   [0, 5, 0, 1, 0, 2, 0, 8, 0],
//   [8, 2, 0, 0, 0, 0, 0, 3, 9],
//   [3, 1, 0, 4, 0, 9, 2, 6, 0],
// ]

const emptyBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Modify one cell
export function modifyCell(board, cell, newNum) {
  const [rowNum, colNum] = cell;

  const newBoard = board.map((row) => [...row]);

  // console.log("old row", newBoard[rowNum][colNum]);
  newBoard[rowNum][colNum] = newNum;
  // console.log("new row", newBoard[rowNum][colNum]);

  return newBoard;
}

// modifyCell_b1(board_1, 9, 9, 7);

// Find the first empty cell
export function findFirstEmptyCell(board) {
  const row = board.find((row) => row.some((num) => num === 0));

  if (!row) {
    return undefined;
  }

  const rowIndex = board.indexOf(row);
  const colIndex = row.findIndex((num) => num === 0);

  return {
    row: rowIndex,
    col: colIndex,
  };
}

// Get Entire Row
export function getEntireRow(board, rowNum) {
  const rowCells = [];

  board[rowNum].forEach((num, colIndex) => {
    rowCells.push({
      value: num,
      row: rowNum,
      col: colIndex,
    });
  });

  return rowCells;
}

// console.log(getEntireRow_b1(board_1, 3));

// Get Entire Column
export function getEntireCol(board, colNum) {
  const colCells = [];

  board.forEach((row, index) => {
    // colCells.push(row[(index, colNum)]);
    colCells.push({
      value: row[colNum],
      row: index,
      col: colNum,
    });
  });

  return colCells;
}

// console.log(getEntireCol_b1(board_1, 0));

// Get a 3×3 box
export function getEntireBox(board, box) {
  const boxCells = [];
  let rowStart;
  let rowEnd;
  let colStart;
  let colEnd;

  if (box === 0 || box === 1 || box === 2) {
    rowStart = 0;
    rowEnd = 2;
  }
  if (box === 3 || box === 4 || box === 5) {
    rowStart = 3;
    rowEnd = 5;
  }
  if (box === 6 || box === 7 || box === 8) {
    rowStart = 6;
    rowEnd = 8;
  }

  if (box === 0 || box === 3 || box === 6) {
    colStart = 0;
    colEnd = 2;
  }
  if (box === 1 || box === 4 || box === 7) {
    colStart = 3;
    colEnd = 5;
  }
  if (box === 2 || box === 5 || box === 8) {
    colStart = 6;
    colEnd = 8;
  }

  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      // boxArray.push(board[row][col]);
      boxCells.push({
        value: board[row][col],
        row,
        col,
      });
    }
  }
  return boxCells;
}

export function getEntireBoxFromCell(cell) {
  let [cellRow, cellCol] = cell;

  const row0To2 = cellRow >= 0 && cellRow <= 2;
  const row3To5 = cellRow >= 3 && cellRow <= 5;
  const row6To8 = cellRow >= 6 && cellRow <= 8;

  const col0To2 = cellCol >= 0 && cellCol <= 2;
  const col3To5 = cellCol >= 3 && cellCol <= 5;
  const col6To8 = cellCol >= 6 && cellCol <= 8;

  if (row0To2) {
    if (col0To2) {
      return 0;
    }
    if (col3To5) {
      return 1;
    }
    if (col6To8) {
      return 2;
    }
  }

  if (row3To5) {
    if (col0To2) {
      return 3;
    }
    if (col3To5) {
      return 4;
    }
    if (col6To8) {
      return 5;
    }
  }

  if (row6To8) {
    if (col0To2) {
      return 6;
    }
    if (col3To5) {
      return 7;
    }
    if (col6To8) {
      return 8;
    }
  }
}

// console.log(getEntireBoxFromCell_b1([0, 3]));

export function cellRelationship(board, cell) {
  const parentRow = getEntireRow(board, cell[0]);
  const parentColumn = getEntireCol(board, cell[1]);
  const parentBox = getEntireBox(board, getEntireBoxFromCell(cell));

  return { parentRow, parentColumn, parentBox };
}

// console.log("[0,0] relationships", cellRelationship(board, [0, 0]));

export function findAllInstancesOfNum(board, number) {
  const instances = [];
  board.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      if (num === number) {
        instances.push({
          row: rowIndex,
          col: colIndex,
          box: getEntireBoxFromCell([rowIndex, colIndex]),
        });
      }
    });
  });

  return instances;
}

// console.log(findAllInstancesOfNum(board, 7));

export function rowConflict(board, cell, number) {
  const [cellRow, cellCol] = cell;
  const hasConflict = board[cellRow].some(
    (rowNum, colIndex) => rowNum === number && colIndex !== cellCol,
  );

  const conflictingCells = board[cellRow].reduce((acc, rowNum, idx) => {
    if (rowNum === number && idx != cellCol)
      acc.push({
        row: cellRow,
        col: idx,
        box: getEntireBoxFromCell([cellRow, idx]),
      });
    return acc;
  }, []);

  return { hasConflict, conflictingCells };
}

// console.log("[0,0] --> 7 rowConflict", rowConflict(board, [0, 0], 7));

export function colConflict(board, cell, number) {
  const [cellRow, cellCol] = cell;
  const hasConflict = getEntireCol(board, cellCol).some(
    (colCell, rowIndex) => colCell.value === number && rowIndex != cellRow,
  );

  const conflictingCells = getEntireCol(board, cellCol).reduce(
    (acc, colCell, idx) => {
      if (colCell.value === number && idx != cellRow) {
        acc.push({
          row: idx,
          col: cellCol,
          box: getEntireBoxFromCell([idx, cellCol]),
        });
      }
      return acc;
    },
    [],
  );

  return { hasConflict, conflictingCells };
}

// console.log("[0,0] --> 7 colConflict", colConflict(board, [0, 0], 7));

export function boxConflict(board, cell, number) {
  const [cellRow, cellCol] = cell;
  const box = getEntireBoxFromCell(cell);
  const boxArray = getEntireBox(board, box);
  // const hasConflict = boxArray.some((boxCell) => boxCell.value === number);

  const conflictingCells = boxArray.reduce((acc, boxCell, idx) => {
    const localRow = Math.floor(idx / 3);
    const localCol = idx % 3;

    const rowStart = Math.floor(cellRow / 3) * 3;
    const colStart = Math.floor(cellCol / 3) * 3;

    const row = localRow + rowStart;
    const col = localCol + colStart;

    if (boxCell.value === number && !(row === cellRow && col === cellCol)) {
      acc.push({
        row,
        col,
        box,
      });
    }
    return acc;
  }, []);

  return { hasConflict: conflictingCells.length > 0, conflictingCells };
}

// console.log("[0,0] --> 7 boxConflict", boxConflict(board, [0, 0], 7));

export function removeDeplicateCells(cellsArray) {
  const uniqueCells = new Map();

  cellsArray.forEach((cell) => {
    const key = `${cell.row}-${cell.col}`;
    uniqueCells.set(key, cell);
  });

  return [...uniqueCells.values()];
}

export function isMoveValid(board, cell, number) {
  const { hasConflict: rowHasConflict, conflictingCells: rowConflictingCells } =
    rowConflict(board, cell, number);
  const { hasConflict: colHasConflict, conflictingCells: colConflictingCells } =
    colConflict(board, cell, number);
  const { hasConflict: boxHasConflict, conflictingCells: boxConflictingCells } =
    boxConflict(board, cell, number);

  return {
    moveIsValid: !(rowHasConflict || colHasConflict || boxHasConflict),
    conflictingCells: removeDeplicateCells([
      ...rowConflictingCells,
      ...colConflictingCells,
      ...boxConflictingCells,
    ]),
  };
}

// console.log("[0,0] --> 7 isMoveValid", isMoveValid(board, [0, 0], 7));

export function allPossibleMoves(board, cell) {
  const possibleMoves = [];

  for (let i = 1; i <= 9; i++) {
    if (isMoveValid(board, cell, i).moveIsValid) {
      possibleMoves.push(i);
    }
  }
  return possibleMoves;
}

function solveBoard(board) {
  const emptyCell = findFirstEmptyCell(board);

  if (!emptyCell) {
    return board;
  }

  const { row, col } = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isMoveValid(board, [row, col], num).moveIsValid) {
      let newBoard = modifyCell(board, [row, col], num);

      let solvedBoard = solveBoard(newBoard);

      if (solvedBoard) {
        return solvedBoard;
      }
    }
  }

  return null;
}

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function filledBoard(board) {
  const emptyCell = findFirstEmptyCell(board);

  if (!emptyCell) {
    return board;
  }

  const { row, col } = emptyCell;

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of numbers) {
    if (isMoveValid(board, [row, col], num).moveIsValid) {
      let newBoard = modifyCell(board, [row, col], num);

      let solvedBoard = filledBoard(newBoard);

      if (solvedBoard) {
        return solvedBoard;
      }
    }
  }

  return null;
}

function countSolutions(board) {
  const emptyCell = findFirstEmptyCell(board);

  if (!emptyCell) {
    return 1;
  }

  const { row, col } = emptyCell;

  let solutionCount = 0;

  for (let num = 1; num <= 9; num++) {
    if (isMoveValid(board, [row, col], num).moveIsValid) {
      board[row][col] = num;
      solutionCount += countSolutions(board);
      board[row][col] = 0;
      if (solutionCount >= 2) {
        return 2;
      }
    }
  }

  return solutionCount;
}

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generatePuzzle(level) {
  const board = filledBoard(emptyBoard);

  const visited = new Set();

  let emptyCells = 0;
  let targetEmptyCells;

  if (level === "easy") {
    targetEmptyCells = randomValue(36, 45);
  }
  if (level === "medium") {
    targetEmptyCells = randomValue(46, 49);
  }
  if (level === "hard") {
    targetEmptyCells = randomValue(50, 54);
  }
  if (level === "expert") {
    targetEmptyCells = randomValue(55, 59);
  }

  while (emptyCells < targetEmptyCells && visited.size < 81) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    const cellKey = `${row}-${col}`;

    if (board[row][col] === 0 || visited.has(cellKey)) {
      continue;
    }

    const originalValue = board[row][col];

    board[row][col] = 0;

    const solutions = countSolutions(board);

    if (solutions === 1) {
      emptyCells++;
    } else if (solutions >= 2) {
      board[row][col] = originalValue;
    }
    visited.add(cellKey);
  }

  return board;
}

// console.log(generatePuzzle("easy"));

export function findBestEmptyCell(board) {
  let bestCell = null;
  let bestMoves = null;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) continue;

      const moves = allPossibleMoves(board, [row, col]);

      if (moves.length === 0) {
        return {
          cell: [row, col],
          moves: [],
        };
      }

      if (bestMoves === null || moves.length < bestMoves.length) {
        bestCell = [row, col];
        bestMoves = moves;
      }
    }
  }

  return {
    cell: bestCell,
    moves: bestMoves,
  };
}
