import clsx from "clsx";

import styles from "./NumPad.module.css";

export default function NumPad({
  enterCellValue,
  activeCell,
  restartGame,
  handleSolver,
  newGame,
}) {
  return (
    <div className={clsx(styles["num-pad"])}>
      <button
        onClick={() => enterCellValue(activeCell, 1)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        1
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 2)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        2
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 3)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        3
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 4)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        4
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 5)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        5
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 6)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        6
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 7)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        7
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 8)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        8
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 9)}
        className={clsx(styles["num-pad-btn"], styles["num-pad-digit"])}
      >
        9
      </button>
      <button
        onClick={() => enterCellValue(activeCell, 0)}
        className={clsx(styles["num-pad-btn"], styles["del-btn"])}
      >
        Del
      </button>
      <button
        onClick={restartGame}
        className={clsx(styles["num-pad-btn"], styles["restart-btn"])}
      >
        Restart
      </button>
      <button
        onClick={handleSolver}
        className={clsx(styles["num-pad-btn"], styles["solve-btn"])}
      >
        Solve
      </button>
      <button
        onClick={newGame}
        className={clsx(styles["num-pad-btn"], styles["new-game-btn"])}
      >
        New Game
      </button>
    </div>
  );
}
