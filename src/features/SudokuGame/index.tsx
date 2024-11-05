import { memo, useCallback, useEffect } from "react";
import useBoared from "../../hooks/useBoared";
import ActionGame, { LevelGame } from "../../components/ActionGame";
import BoaredColumn from "../../components/BoaredColumn";

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

      <ActionGame
        onCheckValidate={handleCheckValidate}
        onSolve={handleSolve}
        onChangeLevel={handleChangeLevel}
        onClear={handleClearColValue}
      />
    </>
  );
};

export default memo(SudokuGame);
