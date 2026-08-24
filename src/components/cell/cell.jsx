import clsx from "clsx";
import styles from "./cell.module.css";

export default function Cell({
  value,
  row,
  col,
  id,
  changeActiveCell,
  isActiveCell,
  isRelativeOfActiveCell,
  isValueSameAsActiveCell,
  isConflicting,
  isWrongMove,
  isCurrentSolverCell,
}) {
  const isCurrentActiveCell = isActiveCell(id);
  const activeCellRelative = isRelativeOfActiveCell(id);
  const sameValueAsActiveCell = isValueSameAsActiveCell(id);
  const isInvalid = isConflicting(id);
  const wrongMove = isWrongMove(id);
  const currentSolverCell = isCurrentSolverCell(id);
  return (
    <div
      onClick={() => changeActiveCell([row, col])}
      className={clsx(
        styles["cell"],
        (col === 2 || col === 5) && styles["thick-right"],
        (row === 3 || row === 6) && styles["thick-top"],
        activeCellRelative && styles["active-cell-relative"],
        sameValueAsActiveCell && styles["same-value-as-active-cell"],
        isInvalid && styles["is-conflicting"],
        wrongMove && styles["is-wrong-move"],
        currentSolverCell && styles["is-current-solver-cell"],
        isCurrentActiveCell && styles["is-current-active-cell"],
      )}
    >
      {value === 0 ? "" : value}
    </div>
  );
}
