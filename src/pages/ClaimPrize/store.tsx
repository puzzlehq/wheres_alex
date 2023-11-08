import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export enum Step {
  _01_Claim,
  _02_Gameover,
}

export enum State {
  Lose,
  Win,
  NoShow,
  Tie
}

type ClaimPrizeStore = {
  step: Step;
  opponent: string;
  wager: number;
  state: State.Lose,
  setStep: (step: Step) => void;
  setOpponent: (opponent: string) => void;
  setWager: (wager: number) => void;
  setState: (state: State) => void;
  claimPrize: () => Promise<void>;
  close: () => void;
};

export const useClaimPrizeStore = create<ClaimPrizeStore>()(
  immer((set) => ({
    step: Step._01_Claim,
    opponent: '',
    wager: 0,
    state: State.Lose,
    setStep: (step: Step) => {
      set({ step });
    },
    setOpponent: (opponent: string) => {
      set({ opponent });
    },
    setWager: (wager: number) => {
      set({ wager });
    },
    setState: (state: State) => {
      console.log(state)
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
