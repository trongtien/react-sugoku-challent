import { memo, useCallback, useEffect } from "react";
import useBoared from "../../hooks/useBoared";
import BoaredColumn from "../../components/BoaredColumn";
import ActionButton from "../../components/ActionButton";
import StatusGame from "../../components/StatusGame";

type LevelGame = "easy" | "medium" | "hard" | "random";

const SudokuGame = () => {
  const boaredStore = useBoared();

  useEffect(() => {
    loadBoared("easy");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBoared = useCallback(
    async (level: LevelGame) => {
      try {
        boaredStore.setLoadingBoared(true);

        const difficulty = getLevelGame(level);

        const response = await fetch(
          `https://sugoku.onrender.com/board?difficulty=${difficulty}`,
        );

        const json = await response.json();
        const boaredGame = json?.board ?? [];

        boaredStore.setBored(boaredGame);
      } catch {
        boaredStore.setLoadingBoared(false);
      }
    },
    [boaredStore],
  );

  const getLevelGame = (level: LevelGame): string => {
    let difficulty = "easy";
    if (level === "hard") {
      difficulty = "hard";
    } else if (level === "medium") {
      difficulty = "medium";
    } else if (level === "random") {
      difficulty = "random";
    } else {
      difficulty = "easy";
    }

    return difficulty;
  };

  const handleChangeCol = useCallback(
    (rowIndex: number, colIndex: number, val: number) => {
      return boaredStore.updateValueCol(rowIndex, colIndex, val);
    },

    [boaredStore],
  );

  const handleSolve = useCallback(async () => {
    const formData = new FormData();
    formData.append("board", JSON.stringify(boaredStore.boared));

    const response = await fetch("https://sugoku.onrender.com/solve", {
      method: "post",
      body: formData,
    });

    const jsonData = await response.json();
    const solutionSolve = jsonData?.solution ?? [];
    boaredStore.setBored(solutionSolve);
  }, [boaredStore]);

  const handleChangeLevel = useCallback(
    (level: LevelGame) => {
      loadBoared(level);
    },
    [loadBoared],
  );

  const handleCheckValidate = useCallback(async () => {
    const formData = new FormData();
    formData.append("board", JSON.stringify(boaredStore.boared));

    const response = await fetch("https://sugoku.onrender.com/validate", {
      method: "post",
      body: formData,
    });

    const jsonData = await response.json();
    const statusValidate = jsonData.status;

    boaredStore.setStatusGame(statusValidate);
  }, [boaredStore]);

  const handleClearColValue = useCallback(() => {
    const boaredNone = [
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

    boaredStore.setBored(boaredNone);
  }, [boaredStore]);

  return (
    <>
      <BoaredColumn onChangeValue={handleChangeCol} />

      <div className="w-96 flex justify-between items-center">
        <h3 className="font-medium">Generate:</h3>

        <ActionButton onActionClick={() => handleChangeLevel("easy")}>
          Easy
        </ActionButton>

        <ActionButton onActionClick={() => handleChangeLevel("medium")}>
          Medium
        </ActionButton>

        <ActionButton onActionClick={() => handleChangeLevel("hard")}>
          Hard
        </ActionButton>

        <ActionButton onActionClick={() => handleChangeLevel("random")}>
          Random
        </ActionButton>

        <ActionButton
          onActionClick={() => handleClearColValue()}
          className="border border-1 px-3 py-1"
        >
          Clear
        </ActionButton>
      </div>

      <div className="w-96 flex justify-between items-center">
        <StatusGame />
      </div>

      <div className="w-96 flex justify-between items-center">
        <ActionButton
          className="border border-1 px-3 py-1"
          onActionClick={handleCheckValidate}
        >
          Check
        </ActionButton>

        <ActionButton
          className="border border-1 px-3 py-1"
          onActionClick={handleSolve}
        >
          Solved
        </ActionButton>
      </div>
    </>
  );
};

export default memo(SudokuGame);
