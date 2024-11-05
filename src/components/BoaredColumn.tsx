import { Fragment, memo, useCallback, useEffect } from "react";
import useBoared from "../hooks/useBoared";
import ColBoared from "./ColBored";

import ActionGame, { LevelGame } from "./ActionGame";

const Boared = () => {
  const boaredStore = useBoared();

  useEffect(() => {
    loadBoared("easy");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBoared = useCallback(
    async (level: LevelGame) => {
      const difficulty = getLevelGame(level);

      const response = await fetch(
        `https://sugoku.onrender.com/board?difficulty=${difficulty}`,
      );

      const json = await response.json();
      const boaredGame = json?.board ?? [];

      boaredStore.setBored(boaredGame);
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
    formData.append("board", boaredStore.boared?.toString());

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
      console.log("level game", level);
      loadBoared(level);
    },
    [loadBoared],
  );

  const handleCheckValidate = useCallback(async () => {
    const formData = new FormData();
    formData.append("board", boaredStore.boared?.toString());

    const response = await fetch("https://sugoku.onrender.com/validate", {
      method: "post",
      body: formData,
    });

    const jsonData = await response.json();
    const statusValidate = jsonData.status;

    boaredStore.setStatusGame(statusValidate);

    return;
  }, [boaredStore]);

  return (
    <>
      <div className="h-96 w-96 grid grid-cols-9 border-2 border-black">
        {boaredStore.boared?.map((row: number[], rowIndex: number) => {
          return (
            <Fragment key={`${rowIndex}-row`}>
              {row?.map((col: number, colIndex: number) => (
                <ColBoared
                  key={`${rowIndex}-${colIndex}`}
                  colIndex={colIndex}
                  rowIndex={rowIndex}
                  value={col}
                  onChangeVal={handleChangeCol}
                />
              ))}
            </Fragment>
          );
        })}
      </div>

      <ActionGame
        onCheckValidate={handleCheckValidate}
        onSolve={handleSolve}
        onChangeLevel={handleChangeLevel}
      />
    </>
  );
};

export default memo(Boared);
