import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AcceptGameInputs, SubmitWagerInputs } from '@state/manager';
import { RecordWithPlaintext } from '@puzzlehq/sdk';

export enum Step {
  _01_SubmitWager,
  _02_AcceptGame,
  _03_Confirmed,
}

type AcceptGameStore = {
  inputsSubmitWager?: Partial<SubmitWagerInputs>;
  inputsAcceptGame?: Partial<AcceptGameInputs>;
  eventIdSubmit?: string;
  eventIdAccept?: string;
  step: Step;
  setSubmitWagerInputs: (inputs: Partial<SubmitWagerInputs>) => void;
  setAcceptGameInputs: (inputs: Partial<AcceptGameInputs>) => void;
  setStep: (step: Step) => void;
  initializeSubmitWager: (
    opponent_wager_record: RecordWithPlaintext,
    key_record: RecordWithPlaintext,
    game_req_notification: RecordWithPlaintext
  ) => void;
  initializeAcceptGame: (
    game_Record: RecordWithPlaintext,
    piece_stake_challenger: RecordWithPlaintext,
    piece_claim_challenger: RecordWithPlaintext,
    piece_stake_opponent: RecordWithPlaintext,
    piece_claim_opponent: RecordWithPlaintext
  ) => void;
  setEventIdSubmit: (id: string) => void;
  setEventIdAccept: (id: string) => void;
  close: () => void;
};

export const useAcceptGameStore = create<AcceptGameStore>()(
  persist(
    (set, get) => ({
      inputsSubmitWager: undefined,
      inputsAcceptGame: undefined,
      eventIdSubmit: undefined,
      eventIdAccept: undefined,
      step: Step._01_SubmitWager,
      setSubmitWagerInputs: (inputsSubmitWager: Partial<SubmitWagerInputs>) => {
        set({ inputsSubmitWager });
        set({ step: Step._01_SubmitWager });
      },
      setAcceptGameInputs: (inputsAcceptGame: Partial<AcceptGameInputs>) => {
        set({ inputsAcceptGame });
        set({ step: Step._02_AcceptGame });
      },
      setStep: (step: Step) => {
        set({ step });
      },
      initializeSubmitWager: (
        opponent_wager_record: RecordWithPlaintext,
        key_record: RecordWithPlaintext,
        game_req_notification: RecordWithPlaintext
      ) => {
        set({
          inputsSubmitWager: {
            opponent_wager_record,
            key_record,
            game_req_notification,
          },
          step: Step._01_SubmitWager,
          eventIdAccept: undefined,
          eventIdSubmit: undefined,
        });
      },
      initializeAcceptGame: (
        game_record: RecordWithPlaintext,
        piece_stake_challenger: RecordWithPlaintext,
        piece_claim_challenger: RecordWithPlaintext,
        piece_stake_opponent: RecordWithPlaintext,
        piece_claim_opponent: RecordWithPlaintext
      ) => {
        set({
          inputsAcceptGame: {
            game_record,
            piece_stake_challenger,
            piece_claim_challenger,
            piece_stake_opponent,
            piece_claim_opponent,
            opponent_answer: get().inputsAcceptGame?.opponent_answer,
            opponent_answer_readable:
              get().inputsAcceptGame?.opponent_answer_readable,
          },
          step: Step._02_AcceptGame,
          eventIdAccept: undefined,
          eventIdSubmit: undefined,
        });
      },
      setEventIdSubmit: (id: string) => {
        set({ eventIdSubmit: id });
      },
      setEventIdAccept: (id: string) => {
        set({ eventIdAccept: id });
      },
      close: () => {
        set({
          step: Step._01_SubmitWager,
          inputsSubmitWager: undefined,
          inputsAcceptGame: undefined,
          eventIdAccept: undefined,
          eventIdSubmit: undefined,
        });
      },
    }),
    {
      name: 'accept-game',
    }
  )
);
