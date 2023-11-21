import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Answer } from '../../state/game_states';

export enum Step {
  _01_Finish,
  _02_Await,
}

type FinishGameStore = {
  step: Step;
  opponent?: string;
  wager?: number;
  answer?: Answer;
  setStep: (step: Step) => void;
  initialize: (opponent: string, wager: number, answer: Answer) => void;
  finish: () => Promise<void>;
  close: () => void;
};

export const useFinishGameStore = create<FinishGameStore>()(
  persist(
    (set) => ({
      step: Step._01_Finish,
      opponent: undefined,
      wager: undefined,
      answer: undefined,
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (opponent: string, wager: number, answer: Answer) => {
        set({ opponent, answer, wager, step: Step._01_Finish });
      },
      finish: async () => {},
      close: () => {
        set({
          step: Step._01_Finish,
          opponent: '',
          wager: 0,
        });
      },
    }),
    {
      name: 'finish-game',
    }
  )
);
