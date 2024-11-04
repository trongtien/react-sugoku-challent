import { create } from "zustand";

interface BoaredStored {
  boared: number[][];
  setBored: (boaredGame: number[][]) => void;
  updateValueCol: (rowIndex: number, colIndex: number, value: number) => void;
}

const useBoared = create<BoaredStored>((set) => ({
  boared: [
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 7, 0],
    [0, 7, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 4, 0, 6, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 5, 4, 6],
    [3, 0, 2, 7, 6, 0, 9, 8, 0],
    [0, 6, 4, 9, 0, 3, 0, 0, 1],
    [9, 8, 0, 5, 2, 1, 0, 6, 0],
  ],

  setBored: (boredGame: number[][]) =>
    set((state) => ({ ...state, boared: boredGame })),

  updateValueCol: (rowIndex: number, colIndex: number, value: number) =>
    set((state) => {
      const currentBored = state.boared;
      currentBored[rowIndex][colIndex] = value;

      return { ...state, boared: currentBored };
    }),
}));

export default useBoared;
