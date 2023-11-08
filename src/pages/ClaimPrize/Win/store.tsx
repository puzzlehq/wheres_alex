import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export enum Step {
  _01_Claim,
  _02_Gameover,
}

type ClaimPrizeWinStore = {
  step: Step;
  opponent: string;
  wager: number;
  answer: string;
  setStep: (step: Step) => void;
  setOpponent: (opponent: string) => void;
  setWager: (wager: number) => void;
  setAnswer: (answer: string) => void;
  claimPrize: () => Promise<void>;
  close: () => void;
};

export const useClaimPrizeWinStore = create<ClaimPrizeWinStore>()(
  immer((set) => ({
    step: Step._01_Claim,
    opponent: '',
    wager: 0,
    answer: '',
    setStep: (step: Step) => {
      set({ step });
    },
    setOpponent: (opponent: string) => {
      set({ opponent });
    },
    setWager: (wager: number) => {
      set({ wager });
    },
    setAnswer: (answer: string) => {
      set({ answer });
    },
    claimPrize: async () => {
      
    },
    close: () => {
      set({
        step: Step._01_Claim,
        opponent: '',
        wager: 0,
      });
    },
  }))
);
