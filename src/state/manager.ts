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
  step: GameStep;
  challenger: string; /// address
  opponent: string; /// address
  address: string; /// address of shared state multisig
  wager: number;

  wagerRecord: Record;

  eventIds?: string[];
}

export class GameManager {
  status: LoadingStatus = 'idle';
  games: Game[] = [];

  constructor(records: Record[]) {
    this.games = this.parseGamesFromRecords(records);
  }

  parseGamesFromRecords(records: Record[]): Game[] {
    return [];
  }

  proposeGame
}

export type ProposeGameInputs = {
  challenger: string;
  opponent: string;
  address: string;
  answer: string;
  seed: string;
  wager: Record;
}

/// old stuff below


type GameState = {
  status: LoadingStatus;
  load: (records: Record[]) => void;
  proposeGame: (
    challenger: string,
    opponent: string,
    address: string,
    answer: string,
    seed: string,
    wager: Record,
  ) => void;
};

export const useGameStore = create<GameState>()(
  immer((set, get) => ({
    status: 'idle',
    load: async (records: Record[]) => {
      set({ status: 'loading' });

      /// todo - process records into `Game` instances
      
    },
    proposeGame: (
      challenger,
      opponent,
      address,
      answer,
      seed,
      wager
    ) => {

    }
  }))
);

export default useGameStore;
