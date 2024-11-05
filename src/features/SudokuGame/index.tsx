import { memo, useCallback, useEffect } from "react";
import useBored from "../../hooks/useBored";
import BoredColumn from "../../components/BoredColumn";
import ActionButton from "../../components/ActionButton";
import StatusGame from "../../components/StatusGame";
import { pathApi } from "../../utils/pathApi";

type LevelGame = "easy" | "medium" | "hard" | "random";

const SudokuGame = () => {
  const baredStore = useBored();

  useEffect(() => {
    loadBored("easy");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBored = useCallback(
    async (level: LevelGame) => {
      try {
        baredStore.setLoadingBored(true);
        const difficulty = getLevelGame(level);
        const response = await fetch(
          `${pathApi.SUDOKU_BOARD}?difficulty=${difficulty}`,
        );

        const json = await response.json();
        const baredGame = json?.board ?? [];

        baredStore.setBored(baredGame);
      } catch {
        baredStore.setLoadingBored(false);
      }
    },
    [baredStore],
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
      return baredStore.updateValueCol(rowIndex, colIndex, val);
    },

    [baredStore],
  );

  const handleSolve = useCallback(async () => {
    const formData = new FormData();
    formData.append("board", JSON.stringify(baredStore.bored));

    const response = await fetch(pathApi.SUDOKU_SOLVE, {
      method: "post",
      body: formData,
    });

    const jsonData = await response.json();
    const solutionSolve = jsonData?.solution ?? [];
    baredStore.setBored(solutionSolve);
  }, [baredStore]);

  const handleChangeLevel = useCallback(
    (level: LevelGame) => {
      loadBored(level);
      baredStore.setLevelGame(level);
    },
    [baredStore, loadBored],
  );

  const handleCheckValidate = useCallback(async () => {
    const formData = new FormData();
    formData.append("board", JSON.stringify(baredStore.bored));

    const response = await fetch(pathApi.SUDOKU_VALIDATE, {
      method: "post",
      body: formData,
    });

    const jsonData = await response.json();
    const statusValidate = jsonData.status;

    baredStore.setStatusGame(statusValidate);
  }, [baredStore]);

  const handleClearColValue = useCallback(() => {
    const boredNone = [
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

    baredStore.setBored(boredNone);
  }, [baredStore]);

  return (
    <section className="w-screen h-screen flex justify-around items-center flex-col gap-2 p-1">
      <BoredColumn onChangeValue={handleChangeCol} />

      <div className="flex flex-col gap-1">
        <div className="w-96 flex justify-between items-center">
          <h3 className="font-medium">Generate:</h3>

          <ActionButton
            onActionClick={() => handleChangeLevel("easy")}
            className={baredStore.levelGame === "easy" ? "font-medium" : ""}
          >
            Easy
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("medium")}
            className={baredStore.levelGame === "medium" ? "font-medium" : ""}
          >
            Medium
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("hard")}
            className={baredStore.levelGame === "hard" ? "font-medium" : ""}
          >
            Hard
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("random")}
            className={baredStore.levelGame === "random" ? "font-medium" : ""}
          >
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
            isDisabled={baredStore.statusGameSection === "solved"}
          >
            Check
          </ActionButton>

          {baredStore.statusGameSection === "solved" ? (
            <ActionButton
              className="border border-1 px-3 py-1"
              onActionClick={() =>
                handleChangeLevel(baredStore.levelGame as LevelGame)
              }
            >
              Reset Game
            </ActionButton>
          ) : null}

          <ActionButton
            className="border border-1 px-3 py-1"
            onActionClick={handleSolve}
            isDisabled={baredStore.statusGameSection === "solved"}
          >
            Solved
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default memo(SudokuGame);
