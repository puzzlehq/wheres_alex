import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AcceptGameInputs, SubmitWagerInputs } from '../../state/manager';
import { RecordWithPlaintext } from '@puzzlehq/sdk';

export enum Step {
  _01_SubmitWager,
  _02_AcceptGame,
  _03_Confirmed,
}

type AcceptGameStore = {
  inputsSubmitWager?: Partial<SubmitWagerInputs>;
  inputsAcceptGame?: Partial<AcceptGameInputs>;
  step: Step;
  setSubmitWagerInputs: (inputs: Partial<SubmitWagerInputs>) => void;
  setAcceptGameInputs: (inputs: Partial<AcceptGameInputs>) => void;
  setStep: (step: Step) => void;
  initializeSubmitWager: (wager_record: RecordWithPlaintext, key_record: RecordWithPlaintext, game_req_notification: RecordWithPlaintext) => void;
  initializeAcceptGame: (gameRecord: RecordWithPlaintext, playerOneClaimRecord: RecordWithPlaintext, playerTwoClaimRecord: RecordWithPlaintext, puzz_piece_stake_one: RecordWithPlaintext, puzz_piece_stake_two: RecordWithPlaintext) => void;
  close: () => void;
};

export const useAcceptGameStore = create<AcceptGameStore>()(
  persist(
    (set, get) => ({
      inputsSubmitWager: undefined,
      inputsAcceptGame: undefined,
      step: Step._01_SubmitWager,
      setSubmitWagerInputs: (inputsSubmitWager: Partial<SubmitWagerInputs>) => {
        set({ inputsSubmitWager });
      },
      setAcceptGameInputs: (inputsAcceptGame: Partial<AcceptGameInputs>) => {
        set({ inputsAcceptGame });
      },
      setStep: (step: Step) => {
        set({ step });
      },
      initializeSubmitWager: (wager_record: RecordWithPlaintext, key_record: RecordWithPlaintext, game_req_notification: RecordWithPlaintext) => {
        set({
          inputsSubmitWager: {
            wager_record,
            key_record,
            game_req_notification,
          },
          step: Step._01_SubmitWager
        });
      },
      initializeAcceptGame: (
        gameRecord: RecordWithPlaintext,
        playerOneClaimRecord: RecordWithPlaintext,
        playerTwoClaimRecord: RecordWithPlaintext,
        puzz_piece_stake_one: RecordWithPlaintext,
        puzz_piece_stake_two: RecordWithPlaintext
      ) => {
        set({
          inputsAcceptGame: {
            gameRecord,
            playerOneClaimRecord,
            playerTwoClaimRecord,
            puzz_piece_stake_one,
            puzz_piece_stake_two
          },
          step: Step._02_AcceptGame
        });
      },
      close: () => {
        set({
          step: Step._01_SubmitWager,
          inputsSubmitWager: undefined,
          inputsAcceptGame: undefined
        });
      },
    }),
    {
      name: 'accept-game',
    }
  )
);
