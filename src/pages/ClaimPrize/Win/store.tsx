import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Answer } from '../../../state/game_states';

export enum Step {
  _01_Claim,
  _02_GameOver,
}

type ClaimPrizeWinStore = {
  step: Step;
  opponent: string;
  wager: number;
  answer?: Answer;
  setStep: (step: Step) => void;
  initialize: (opponent: string, wager: number, answer: Answer) => void;
  claimWinPrize: () => Promise<void>;
  close: () => void;
};

export const useClaimPrizeWinStore = create<ClaimPrizeWinStore>()(
  persist(
    (set) => ({
      step: Step._01_Claim,
      opponent: '',
      wager: 0,
      answer: undefined,
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (opponent: string, wager: number, answer: Answer) => {
        set({ opponent, answer, wager, step: Step._01_Claim });
      },
      claimWinPrize: async () => {},
      close: () => {
        set({
          step: Step._01_Claim,
          opponent: '',
          wager: 0,
        });
      },
    }),
    {
      name: 'claim-game-win',
    }
  )
);
