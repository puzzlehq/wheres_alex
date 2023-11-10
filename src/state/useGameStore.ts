import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CreateEventRequest, CreateEventResponse } from '@puzzlehq/sdk';
import { EventType, Visibility } from '@puzzlehq/types';
import { Record } from '@puzzlehq/sdk';

/// todo - update these
export const stepFees = {
  proposed: 1,
  waitingAccept: 1,
  accepted: 1,
  waitingReveal: 1,
  waitingClaim: 1,
  reneged: 1,
};

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/// note: def more to come here
export type GameStep = 
  'proposed'
  | 'waitingAccept'
  | 'accepted'
  | 'waitingReveal'
  | 'waitingClaim'
  | 'reneged';

export type Game = {
  address: string; /// address of shared state multisig
  step: GameStep;
}

type GameState = {
  status: LoadingStatus;
  load: (records: Record[]) => void;
};

export const useGameStore = create<GameState>()(
  immer((set, get) => ({
    status: 'idle',
    load: async (records: Record[]) => {
      set({ status: 'loading' });

      /// todo -- fetch game state

    }
  }))
);

export default useGameStore;
