import { useEffect } from "react";
import clsx from "clsx";

import Cell from "./components/cell/cell";
import NumPad from "./components/NumPad/NumPad";

import "./App.css";

import { useGameLogic } from "./hooks/useGameLogic";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const {
    sodukuBoard,
    activeCell,
    playMode,
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
  } = useGameLogic();

  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light",
    );
  }, [theme]);

  const boardCellElements = sodukuBoard.map((row, rowIndex) => {
    return row.map((num, colIndex) => {
      return (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          id={`${rowIndex}-${colIndex}`}
          value={num}
          row={rowIndex}
          col={colIndex}
          changeActiveCell={changeActiveCell}
          isActiveCell={isActiveCell}
          isRelativeOfActiveCell={isRelativeOfActiveCell}
          isValueSameAsActiveCell={isCellValueSameAsActiveCell}
          isConflicting={isConflicting}
          isWrongMove={isWrongMove}
          isCurrentSolverCell={isCurrentSolverCell}
        />
      );
    });
  });

  // RENDER COUNTING
  // let renderCount = useRef(0);
  // renderCount.current++;
  // console.log(`RENDER COUNT = ${renderCount.current}`);

  return (
    <main className={clsx("main-game-container")}>
      <section className={clsx("logo-theme-container")}>
        <h1>
          Sudoku By <span className={clsx("logo-dev-name")}>Loy</span>
        </h1>
        <div className={clsx("theme-container")}>
          <p>THEME</p>
          <div className={clsx("theme-btns-container")}>
            <button
              onClick={() => changeTheme("light")}
              className={clsx(
                "theme-btn",
                "theme-btn-light",
                theme === "light" && "is-current-theme",
              )}
            >
              1
            </button>
            <button
              onClick={() => changeTheme("dark")}
              className={clsx(
                "theme-btn",
                "theme-btn-dark",
                theme === "dark" && "is-current-theme",
              )}
            >
              2
            </button>
          </div>
        </div>
      </section>

      <section className={clsx("play-mode-btns-container")}>
        <button
          onClick={() => handlePlayMode("easy")}
          className={clsx(
            "play-mode-btn",
            playMode === "easy" && "current-play-mode",
          )}
        >
          Easy
        </button>
        <button
          onClick={() => handlePlayMode("medium")}
          className={clsx(
            "play-mode-btn",
            playMode === "medium" && "current-play-mode",
          )}
        >
          Medium
        </button>
        <button
          onClick={() => handlePlayMode("hard")}
          className={clsx(
            "play-mode-btn",
            playMode === "hard" && "current-play-mode",
          )}
        >
          Hard
        </button>
        <button
          onClick={() => handlePlayMode("expert")}
          className={clsx(
            "play-mode-btn",
            playMode === "expert" && "current-play-mode",
          )}
        >
          Expert
        </button>
      </section>

      <section className={clsx("board-num-pad-container")}>
        <div className={clsx("board")}>
          <section className={clsx("sodoku-board")}>
            {boardCellElements}
          </section>
        </div>

        <NumPad
          enterCellValue={enterCellValue}
          activeCell={activeCell}
          restartGame={restartGame}
          handleSolver={handleSolver}
          newGame={newGame}
        />
      </section>
    </main>
  );
}
// enterCellValue,
//   activeCell,
//   restartGame,
//   handleSolver,
//   newGame
