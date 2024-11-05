import { memo } from "react";

export type LevelGame = "easy" | "medium" | "hard" | "random";

type Props = {
  onClear?: () => void;
  onChangeLevel?: (level: LevelGame) => void;
  onSolve?: () => void;
  onCheckValidate?: () => void;
};

const ActionGame = memo(
  ({ onClear, onChangeLevel, onSolve, onCheckValidate }: Props) => {
    const handleLevelChange = (level: LevelGame) => {
      return onChangeLevel && onChangeLevel(level);
    };

    return (
      <>
        <div className="w-96 flex justify-between items-center">
          <h3 className="font-medium">Generate:</h3>

          <button onClick={() => handleLevelChange("easy")}>Easy</button>

          <button onClick={() => handleLevelChange("medium")}>Medium</button>

          <button onClick={() => handleLevelChange("hard")}>Hard</button>

          <button onClick={() => handleLevelChange("random")}>Random</button>

          <button className="border border-1 px-3 py-1" onClick={onClear}>
            Clear
          </button>
        </div>

        <div className="w-96 flex justify-between items-center">
          <button
            className="border border-1 px-3 py-1"
            onClick={onCheckValidate}
          >
            Check
          </button>
          <button className="border border-1 px-3 py-1" onClick={onSolve}>
            Solved
          </button>
        </div>
      </>
    );
  },
);

export default ActionGame;
