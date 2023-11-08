import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export enum Step {
  _01_AcceptGame,
  _02_FindAlex,
  _03_Confirmed,
}

type AcceptGameStore = {
  step: Step;
  opponent: string;
  wager: number;
  setStep: (step: Step) => void;
  setOpponent: (opponent: string) => void;
  setWager: (wager: number) => void;
  createGame: () => Promise<void>;
  close: () => void;
};

export const useAcceptGameStore = create<AcceptGameStore>()(
  immer((set, get) => ({
    step: Step._01_AcceptGame,
    opponent: '',
    wager: 0,
    setStep: (step: Step) => {
      set({ step });
    },
    setOpponent: (opponent: string) => {
      set({ opponent });
    },
    setWager: (wager: number) => {
      set({ wager });
    },
    createGame: async () => {
      
    },
    close: () => {
      set({
        step: Step._01_AcceptGame,
        opponent: '',
        wager: 0,
      });
    },
  }))
);
