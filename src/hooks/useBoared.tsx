import { create } from "zustand";

interface BoaredStored {
  boared: number[][];
  statusGameSection: string;
  setBored: (boaredGame: number[][]) => void;
  setStatusGame: (status: string) => void;
  updateValueCol: (rowIndex: number, colIndex: number, value: number) => void;
}

const useBoared = create<BoaredStored>((set) => ({
  boared: [],
  statusGameSection: "unsolved",

  setStatusGame: (status: string) =>
    set((state) => ({ ...state, statusGameSection: status })),

  setBored: (boredGame: number[][]) =>
    set((state) => ({
      ...state,
      boared: boredGame,
    })),

  updateValueCol: (rowIndex: number, colIndex: number, value: number) =>
    set((state) => {
      const currentBored = state.boared;
      currentBored[rowIndex][colIndex] = value;

      return { ...state, boared: currentBored };
    }),
}));

export default useBoared;
