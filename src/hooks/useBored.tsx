import { create } from "zustand";

interface BoredStored {
  loadingGame: boolean;
  bored: number[][];
  levelGame: string;
  statusGameSection: string;
  setBored: (boredGame: number[][]) => void;
  setStatusGame: (status: string) => void;
  setLoadingBored: (isLoading: boolean) => void;
  setLevelGame: (level: string) => void;
  updateValueCol: (rowIndex: number, colIndex: number, value: number) => void;
}

const useBored = create<BoredStored>((set) => ({
  loadingGame: true,
  levelGame: "easy",
  bored: [],
  statusGameSection: "unsolved",

  setLevelGame: (level: string) =>
    set((state) => ({
      ...state,
      levelGame: level,
      statusGameSection: "unsolved",
    })),

  setLoadingBored: (status: boolean) =>
    set((state) => ({ ...state, loadingGame: status })),

  setStatusGame: (status: string) =>
    set((state) => ({ ...state, statusGameSection: status })),

  setBored: (boredGame: number[][]) =>
    set((state) => ({
      ...state,
      bored: boredGame,
      loadingGame: false,
    })),

  updateValueCol: (rowIndex: number, colIndex: number, value: number) =>
    set((state) => {
      const currentBored = state.bored;
      currentBored[rowIndex][colIndex] = value;

      return { ...state, bored: currentBored };
    }),
}));

export default useBored;
