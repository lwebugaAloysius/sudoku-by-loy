import { useState, useEffect, useRef } from "react";

import {
  removeDeplicateCells,
  modifyCell,
  cellRelationship,
  findAllInstancesOfNum,
  isMoveValid,
  findFirstEmptyCell,
  generatePuzzle,
  findBestEmptyCell,
} from "../utilities";

export function useGameLogic() {
  const [playMode, setPlayMode] = useState(() => {
    const savedPlayMode = localStorage.getItem("play-mode");

    return savedPlayMode ? savedPlayMode : "easy";
  });

  const initialBoard = useRef(null);

  const [sodukuBoard, setSodukuBoard] = useState(() => {
    const savedBoard = localStorage.getItem("soduku-board");
    const genBoard = localStorage.getItem("generated-board");

    if (savedBoard && genBoard) {
      initialBoard.current = JSON.parse(genBoard);
      return JSON.parse(savedBoard);
    }

    const newPuzzle = generatePuzzle(playMode);
    initialBoard.current = newPuzzle;
    localStorage.setItem("generated-board", JSON.stringify(newPuzzle));

    return newPuzzle;
  });
  const [activeCell, setActiveCell] = useState(null);
  const [allConflictingCellsIDs, setAllConflictingCellsIDs] = useState([]);
  const [wrongMoveCellIDs, setWrongMoveCellIDs] = useState([]);
  const [currentSolverCell, setCurrentSolverCell] = useState(null);
  let recursiveCounts = useRef(0);
  let solverSpeed = useRef(70);

  function isActiveCell(id) {
    if (activeCell === null) return;
    const [row, col] = activeCell;
    const activeCellID = `${row}-${col}`;
    return activeCellID === id;
  }

  function changeActiveCell(cell) {
    setActiveCell(cell);
  }

  function getActiveCellRelatives() {
    if (activeCell == null) return;

    const { parentRow, parentColumn, parentBox } = cellRelationship(
      sodukuBoard,
      activeCell,
    );

    const activeCellRelatives = removeDeplicateCells([
      ...parentRow,
      ...parentBox,
      ...parentColumn,
    ]);

    const activeCellRelativesIDs = activeCellRelatives.map(
      (relativeCell) => `${relativeCell.row}-${relativeCell.col}`,
    );

    return activeCellRelativesIDs;
  }

  function isRelativeOfActiveCell(cellID) {
    if (activeCell === null) return;
    const relativesIDs = getActiveCellRelatives();
    return relativesIDs.some((id) => id === cellID);
  }

  function getCellsSameAsActiveCell() {
    if (activeCell == null) return;
    const [activeCellRow, activeCellCol] = activeCell;

    if (sodukuBoard[activeCellRow][activeCellCol] === 0) return;

    const allInstanceCells = findAllInstancesOfNum(
      sodukuBoard,
      sodukuBoard[activeCellRow][activeCellCol],
    );
    const allInstanceCellsIDs = allInstanceCells.map(
      (instanceCell) => `${instanceCell.row}-${instanceCell.col}`,
    );
    return allInstanceCellsIDs;
  }

  function isCellValueSameAsActiveCell(cellID) {
    if (activeCell === null) return;
    const [activeCellRow, activeCellCol] = activeCell;

    if (sodukuBoard[activeCellRow][activeCellCol] === 0) return;
    return getCellsSameAsActiveCell().some((id) => id === cellID);
  }

  function enterCellValue(cell, value) {
    if (cell == null) return;

    const [row, col] = cell;

    if (initialBoard.current[row][col] != 0) return;

    setSodukuBoard((prevBoard) => modifyCell(prevBoard, cell, value));
  }

  function getConflictingCells(cell) {
    const [cellRow, cellCol] = cell;
    const value = sodukuBoard[cellRow][cellCol];
    const result = isMoveValid(sodukuBoard, cell, value);
    return result;
  }

  function isConflicting(cellID) {
    if (allConflictingCellsIDs.length === 0) return;

    return allConflictingCellsIDs.some((id) => id === cellID);
  }

  function isWrongMove(cellID) {
    if (wrongMoveCellIDs.length === 0) return;

    return wrongMoveCellIDs.some((id) => id === cellID);
  }

  function getAllBoardConflictingCells() {
    const conflictingBoardCells = [];
    const wrongCellMove = [];

    sodukuBoard.forEach((row, rowIndex) => {
      row.forEach((num, colIndex) => {
        if (initialBoard.current[rowIndex][colIndex] != 0 || num === 0) return;

        const result = getConflictingCells([rowIndex, colIndex]);

        if (result.moveIsValid) return;

        wrongCellMove.push(`${rowIndex}-${colIndex}`);

        result.conflictingCells.forEach((cell) => {
          conflictingBoardCells.push(`${cell.row}-${cell.col}`);
        });
      });
    });

    setWrongMoveCellIDs(wrongCellMove);
    setAllConflictingCellsIDs(conflictingBoardCells);
  }

  function restartGame() {
    const restartedBoard = initialBoard.current.map((row) => [...row]);
    setSodukuBoard(restartedBoard);
    setActiveCell(null);
    setCurrentSolverCell(null);
  }

  function newGame() {
    const newPuzzle = generatePuzzle(playMode);
    initialBoard.current = newPuzzle;

    setSodukuBoard(newPuzzle.map((row) => [...row]));

    localStorage.setItem("generated-board", JSON.stringify(newPuzzle));
    localStorage.setItem("soduku-board", JSON.stringify(newPuzzle));
    setActiveCell(null);
    setCurrentSolverCell(null);
  }

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // THIS FUNTION IS NOT USED FOR THE SOLVING FUNCTIONALITY. THE ONE WITH MRV IS USED SINCE TO REDUCES ON THE NUMBER OF RECURSIVE CALLS BY REDUCING ON THE EXPLORATION OF THE SEARCH TREE.
  async function solver(board, updateBoard) {
    recursiveCounts.current++;
    const emptyCell = findFirstEmptyCell(board);

    if (!emptyCell) {
      return board;
    }

    const { row, col } = emptyCell;

    setCurrentSolverCell(`${row}-${col}`);

    for (let num = 1; num <= 9; num++) {
      if (isMoveValid(board, [row, col], num).moveIsValid) {
        let newBoard = modifyCell(board, [row, col], num);

        updateBoard(newBoard);

        await pause(solverSpeed.current);

        let solvedBoard = await solver(newBoard, updateBoard);

        if (solvedBoard) {
          return solvedBoard;
        }

        setCurrentSolverCell(`${row}-${col}`);

        const undoneBoard = modifyCell(board, [row, col], 0);
        updateBoard(undoneBoard);

        await pause(solverSpeed.current);
      }
    }

    return null;
  }

  async function solverMRV(board, updateBoard) {
    recursiveCounts.current++;

    const { cell, moves } = findBestEmptyCell(board);

    if (!cell) {
      return board;
    }

    const [row, col] = cell;

    setCurrentSolverCell(`${row}-${col}`);

    if (moves.length === 0) {
      return null;
    }

    for (const num of moves) {
      let newBoard = modifyCell(board, [row, col], num);

      updateBoard(newBoard);

      await pause(solverSpeed.current);

      let solvedBoard = await solverMRV(newBoard, updateBoard);

      if (solvedBoard) {
        return solvedBoard;
      }

      setCurrentSolverCell(`${row}-${col}`);

      const undoneBoard = modifyCell(board, [row, col], 0);
      updateBoard(undoneBoard);

      await pause(solverSpeed.current);
    }

    return null;
  }

  async function handleSolver() {
    recursiveCounts.current = 0;
    setActiveCell(null);
    const startingBoard = initialBoard.current.map((row) => [...row]);
    setSodukuBoard(startingBoard);
    await solverMRV(startingBoard, setSodukuBoard);
    console.log(`Recursive Count: ${recursiveCounts.current}`);
  }

  function isCurrentSolverCell(cellID) {
    if (currentSolverCell === null) return;
    return currentSolverCell === cellID;
  }

  function handlePlayMode(mode) {
    setPlayMode(mode);

    const newBoard = generatePuzzle(mode);
    initialBoard.current = newBoard;

    setSodukuBoard(newBoard.map((row) => [...row]));
    localStorage.setItem("generated-board", JSON.stringify(newBoard));
    localStorage.setItem("soduku-board", JSON.stringify(newBoard));

    localStorage.setItem("play-mode", mode);

    setActiveCell(null);
    setCurrentSolverCell(null);
  }

  useEffect(() => {
    localStorage.setItem("soduku-board", JSON.stringify(sodukuBoard));
  }, [sodukuBoard]);

  useEffect(() => {
    getAllBoardConflictingCells();
  }, [sodukuBoard]);

  return {
    sodukuBoard,
    activeCell,
    playMode,
    getAllBoardConflictingCells,
    changeActiveCell,
    isActiveCell,
    isRelativeOfActiveCell,
    isCellValueSameAsActiveCell,
    isConflicting,
    isWrongMove,
    isCurrentSolverCell,
    enterCellValue,
    restartGame,
    handleSolver,
    newGame,
    handlePlayMode,
  };
}
