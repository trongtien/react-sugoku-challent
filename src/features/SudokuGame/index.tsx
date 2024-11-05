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
      boaredStore.setLevelGame(level);
    },
    [boaredStore, loadBoared],
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
    <section className="w-screen h-screen flex justify-around items-center flex-col gap-2 p-1">
      <BoaredColumn onChangeValue={handleChangeCol} />

      <div className="flex flex-col gap-1">
        <div className="w-96 flex justify-between items-center">
          <h3 className="font-medium">Generate:</h3>

          <ActionButton
            onActionClick={() => handleChangeLevel("easy")}
            className={boaredStore.levelGame === "easy" ? "font-medium" : ""}
          >
            Easy
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("medium")}
            className={boaredStore.levelGame === "medium" ? "font-medium" : ""}
          >
            Medium
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("hard")}
            className={boaredStore.levelGame === "hard" ? "font-medium" : ""}
          >
            Hard
          </ActionButton>

          <ActionButton
            onActionClick={() => handleChangeLevel("random")}
            className={boaredStore.levelGame === "random" ? "font-medium" : ""}
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
            isDisabled={boaredStore.statusGameSection === "solved"}
          >
            Check
          </ActionButton>

          {boaredStore.statusGameSection === "solved" ? (
            <ActionButton
              className="border border-1 px-3 py-1"
              onActionClick={() =>
                handleChangeLevel(boaredStore.levelGame as LevelGame)
              }
            >
              Reset Game
            </ActionButton>
          ) : null}

          <ActionButton
            className="border border-1 px-3 py-1"
            onActionClick={handleSolve}
            isDisabled={boaredStore.statusGameSection === "solved"}
          >
            Solved
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default memo(SudokuGame);
