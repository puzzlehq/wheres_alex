import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProposeGameInputs } from '@state/manager';

export enum Step {
  _01_NewGame,
  _02_HideAlex,
  _03_StartWager,
  _04_ConfirmStartGame,
  _05_GameStarted,
}

type NewGameStore = {
  inputs?: Partial<ProposeGameInputs>;
  eventId?: string;
  step: Step;
  initialize: (challenger: string) => void;
  setInputs: (inputs: Partial<ProposeGameInputs>) => void;
  setEventId: (eventId: string) => void;
  setStep: (step: Step) => void;
  close: () => void;
};

export const useNewGameStore = create<NewGameStore>()(
  persist(
    (set) => ({
      inputs: undefined,
      eventId: undefined,
      step: Step._01_NewGame,
      initialize: (challenger: string) => {
        set({
          inputs: {
            challenger,
          },
          eventId: undefined,
          step: Step._01_NewGame,
        });
      },
      setInputs: (inputs: Partial<ProposeGameInputs>) => {
        set({ inputs });
      },
      setEventId: (eventId: string) => {
        set({ eventId });
      },
      setStep: (step: Step) => {
        set({ step });
      },
      close: () => {
        set({
          inputs: undefined,
          eventId: undefined,
          step: Step._01_NewGame,
        });
      },
    }),
    {
      name: 'new-game',
    }
  )
);
