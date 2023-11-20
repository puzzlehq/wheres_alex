import { create } from 'zustand';
import { Answer } from '../../state/game_states';
import { persist } from 'zustand/middleware'

export enum Step {
  _01_AcceptGame,
  _02_FindTreasure,
  _03_Confirmed,
}

type AcceptGameStore = {
  step: Step;
  opponent: string;
  answer?: Answer;
  wager: number;
  multisig?: string;
  eventId?: string;
  setStep: (step: Step) => void;
  setAnswer: (answer: Answer) => void;
  submit: () => Promise<void>;
  initialize: (opponent: string, wager: number, multisig: string) => void,
  acceptGame: () => Promise<void>;
  rejectGame: () => Promise<void>;
  close: () => void;
};

export const useAcceptGameStore = create<AcceptGameStore>()(
  persist((set, get) => ({
    step: Step._01_AcceptGame,
    wager: 0,
    opponent: '',
    answer: undefined,
    multisig: undefined,
    setStep: (step: Step) => {
      set({ step });
    },
    setAnswer: (answer: Answer) => {
      set({ answer });
    },
    submit: async () => {
      set({ eventId: '1234532' });
    },
    initialize: (opponent: string, wager: number, multisig: string) => {
      set({ opponent, wager, multisig, step: Step._01_AcceptGame });
    },
    acceptGame: async () => {
      set({ step: Step._02_FindTreasure });
    },
    rejectGame: async () => {
      get().close()
    },
    close: () => {
      set({
        step: Step._01_AcceptGame,
        opponent: '',
        wager: 0,
      });
    },
  }), {
    name: 'accept-game'
  })
);
