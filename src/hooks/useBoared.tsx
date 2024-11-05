import { create } from "zustand";

interface BoaredStored {
  loadinGame: boolean;
  boared: number[][];
  levelGame: string;
  statusGameSection: string;
  setBored: (boaredGame: number[][]) => void;
  setStatusGame: (status: string) => void;
  setLoadingBoared: (isLoading: boolean) => void;
  setLevelGame: (level: string) => void;
  updateValueCol: (rowIndex: number, colIndex: number, value: number) => void;
}

const useBoared = create<BoaredStored>((set) => ({
  loadinGame: true,
  levelGame: "easy",
  boared: [],
  statusGameSection: "unsolved",

  setLevelGame: (level: string) =>
    set((state) => ({ ...state, levelGame: level })),

  setLoadingBoared: (status: boolean) =>
    set((state) => ({ ...state, loadinGame: status })),

  setStatusGame: (status: string) =>
    set((state) => ({ ...state, statusGameSection: status })),

  setBored: (boredGame: number[][]) =>
    set((state) => ({
      ...state,
      boared: boredGame,
      loadinGame: false,
    })),

  updateValueCol: (rowIndex: number, colIndex: number, value: number) =>
    set((state) => {
      const currentBored = state.boared;
      currentBored[rowIndex][colIndex] = value;

      return { ...state, boared: currentBored };
    }),
}));

export default useBoared;
