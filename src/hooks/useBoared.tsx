import { create } from "zustand";

interface BoaredStored {
  loadinGame: boolean;
  boared: number[][];
  statusGameSection: string;
  setBored: (boaredGame: number[][]) => void;
  setStatusGame: (status: string) => void;
  setLoadingBoared: (isLoading: boolean) => void;
  updateValueCol: (rowIndex: number, colIndex: number, value: number) => void;
}

const useBoared = create<BoaredStored>((set) => ({
  loadinGame: true,
  boared: [],
  statusGameSection: "unsolved",

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
