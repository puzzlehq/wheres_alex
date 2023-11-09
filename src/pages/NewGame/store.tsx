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

function generateMultisig(
  opponent: string,
  player_account: string
): { multisig: string; seed: Uint8Array } {
  // Our logic to generate multisig and seed using hooks to wallet wasm
  return {
    multisig: 'ms_' + opponent + player_account, // example outputs
    seed: new Uint8Array(),
  };
}

type NewGameStore = {
  step: Step;
  opponent: string;
  wager: number;
  player_address?: string;
  answer?: Answer;
  multisig?: string;
  eventId?: string;
  seed?: Uint8Array;
  setStep: (step: Step) => void;
  setOpponent: (opponent: string) => void;
  setWager: (wager: number) => void;
  setAnswer: (answer: Answer) => void;
  createGame: () => Promise<void>;
  close: () => void;
};

export const useNewGameStore = create<NewGameStore>()(
  immer((set, get) => ({
    step: Step._01_NewGame,
    opponent: '',
    wager: 0,
    player_address: undefined,
    answer: undefined,
    multisig: undefined,
    setStep: (step: Step) => {
      set({ step });
    },
    setOpponent: (opponent: string) => {
      const { multisig, seed } = generateMultisig(opponent, get().player_address ?? '');
      set({ opponent, multisig, seed });
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
      const opponent = get().opponent;
      const multisig = get().multisig;
      const answer = get().answer;
      const seed = get().seed;
      const wager = get().wager;
      const player_address = get().player_address;

      if (!opponent || !multisig || !answer || !seed || !wager || !player_address) {
        return;
      }
      
      const result =
        opponent +
        player_address +
        multisig +
        seed.toString() +
        wager.toString() +
        answer
      
      set({
        eventId: result
      })
    },
    initialize: (player_address: string) => {
      set({ player_address });
    },
    close: () => {
      set({
        step: Step._01_NewGame,
        opponent: '',
        wager: 0,
        player_address: undefined,
        answer: undefined,
        multisig: undefined,
      });
    },
  }))
);
