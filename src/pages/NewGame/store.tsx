import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Answer } from '../../models/game_states';

export enum Step {
  _01_NewGame,
  _02_HideAlex,
  _03_StartWager,
  _04_ConfirmStartGame,
  _05_GameStarted,
}

type NewGameStore = {
  step: Step;
  opponent: string;
  wager: number;
  answer?: Answer;
  multisig?: string;
  eventId?: string;
  setStep: (step: Step) => void;
  setOpponent: (opponent: string) => void;
  setWager: (wager: number) => void;
  setAnswer: (answer: Answer) => void;
  setMultisig: (multisig: string) => void;
  setEventId: (eventId: string) => void;
  createGame: () => Promise<void>;
  close: () => void;
};

export const useNewGameStore = create<NewGameStore>()(
  immer((set) => ({
    step: Step._01_NewGame,
    opponent: '',
    wager: 0,
    answer: undefined,
    multisig: undefined,
    setStep: (step: Step) => {
      set({ step });
    },
    setOpponent: (opponent: string) => {
      set({ opponent });
    },
    setWager: (wager: number) => {
      set({ wager });
    },
    setAnswer: (answer: Answer) => {
      set({ answer });
    },
    setMultisig: (multisig: string) => {
      set({ multisig });
    },
    setEventId: (eventId: string) => {
      set({ eventId });
    },
    createGame: async () => {
      
    },
    close: () => {
      set({
        step: Step._01_NewGame,
        opponent: '',
        wager: 0,
      });
    },
  }))
);
