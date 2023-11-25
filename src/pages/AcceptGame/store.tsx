import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AcceptGameInputs } from '../../state/manager';

export enum Step {
  _01_AcceptGame,
  _02_FindAlex,
  _03_Confirmed,
}

type AcceptGameStore = {
  inputs?: Partial<AcceptGameInputs>;
  step: Step;
  setInputs: (inputs: Partial<AcceptGameInputs>) => void;
  setStep: (step: Step) => void;
  initialize: (opponent: string, wagerAmount: number, multisig: string) => void;
  close: () => void;
};

export const useAcceptGameStore = create<AcceptGameStore>()(
  persist(
    (set, get) => ({
      inputs: undefined,
      step: Step._01_AcceptGame,
      setInputs: (inputs: Partial<AcceptGameInputs>) => {
        set({ inputs });
      },
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (opponent: string, wagerAmount: number, game_multisig: string) => {
        set({
          inputs: {
            opponent,
            wagerAmount: wagerAmount.toString(),
            game_multisig,
          },
          step: Step._01_AcceptGame
        });
      },
      close: () => {
        set({
          step: Step._01_AcceptGame,
          inputs: undefined,
        });
      },
    }),
    {
      name: 'accept-game',
    }
  )
);
