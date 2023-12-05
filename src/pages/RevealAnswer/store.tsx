import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { RevealAnswerInputs } from '@state/manager';

export enum Step {
  _01_Finish,
  _02_Confirmed,
}

type RevealAnswerStore = {
  inputsRevealAnswer?: Partial<RevealAnswerInputs>;
  eventId?: string;
  step: Step;
  setStep: (step: Step) => void;
  initialize: (
    reveal_answer_notification_record: RecordWithPlaintext,
    challenger_answer_record: RecordWithPlaintext,
    joint_piece_stake: RecordWithPlaintext,
    challenger_claim_signature: RecordWithPlaintext
  ) => void;
  setEventId: (eventId?: string) => void;
  close: () => void;
};

export const useRevealAnswerStore = create<RevealAnswerStore>()(
  persist(
    (set) => ({
      inputsRevealAnswer: undefined,
      eventId: undefined,
      step: Step._01_Finish,
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (
        reveal_answer_notification_record: RecordWithPlaintext,
        challenger_answer_record: RecordWithPlaintext,
        joint_piece_stake: RecordWithPlaintext,
        challenger_claim_signature: RecordWithPlaintext
      ) => {
        set({
          inputsRevealAnswer: {
            reveal_answer_notification_record,
            challenger_answer_record,
            joint_piece_stake,
            challenger_claim_signature,
          },
          step: Step._01_Finish,
          eventId: undefined,
        });
      },
      setEventId: (eventId) => {
        set({ eventId });
      },
      close: () => {
        set({
          inputsRevealAnswer: undefined,
          step: Step._01_Finish,
          eventId: undefined,
        });
      },
    }),
    {
      name: 'reveal-answer',
    }
  )
);
