import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { FinishGameInputs } from '@state/manager';

export enum Step {
  _01_Claim,
  _02_GameOver,
}

type ClaimPrizeWinStore = {
  inputs?: Partial<FinishGameInputs>;
  eventId?: string;
  step: Step;
  setStep: (step: Step) => void;
  setEventId: (eventId?: string) => void;
  initialize: (
    game_record: RecordWithPlaintext,
    joint_piece_winner: RecordWithPlaintext,
    piece_joint_stake: RecordWithPlaintext,
    joint_piece_time_claim: RecordWithPlaintext
  ) => void;
  close: () => void;
};

export const useClaimPrizeWinStore = create<ClaimPrizeWinStore>()(
  persist(
    (set) => ({
      inputs: undefined,
      eventId: undefined,
      step: Step._01_Claim,
      setStep: (step: Step) => {
        set({ step });
      },
      setEventId: (eventId?: string) => {
        set({ eventId });
      },
      initialize: (
        game_record: RecordWithPlaintext,
        joint_piece_winner: RecordWithPlaintext,
        piece_joint_stake: RecordWithPlaintext,
        joint_piece_time_claim: RecordWithPlaintext
      ) => {
        set({
          inputs: {
            game_record,
            joint_piece_winner,
            piece_joint_stake,
            joint_piece_time_claim,
          },
        });
      },
      claimWinPrize: async () => {},
      close: () => {
        set({
          inputs: undefined,
          eventId: undefined,
          step: Step._01_Claim,
        });
      },
    }),
    {
      name: 'claim-game-win',
    }
  )
);
