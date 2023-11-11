import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Record } from '@puzzlehq/sdk';
import { Answer } from './game_states';

export const GAME_PROGRAM_ID = 'cflip_gm_aleo_testing_123.aleo';

export const GAME_FUNCTIONS = {
  propose_game: 'propose_game',
  accept_game: 'accept_game',
  set_wager: 'set_wager',
  reveal_answer: 'reveal_answer',
  finish_game: 'finish_game',
} 

/// todo - update these
export const stepFees = {
  propose_game: 1,
  accept_game: 1,
  set_wager: 1,
  reveal_answer: 1,
  finish_game: 1,
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
}

export type ProposeGameInputs = {
  eventId: string;
  challenger: string;
  opponent: string;
  answer: Answer;
  seed: string;
  game_address: string;
  wagerAmount: number;
  wagerRecord: Record;
}

// used for submit wager and accept game
export type AcceptGameInputs = {
  eventIdWager: string;
  eventIdAccept: string;
  gameRecord: Record;
  playerOneClaimRecord: Record;
  playerTwoClaimRecord: Record;
  puzz_piece_stake_one: Record;
  puzz_piece_stake_two: Record;
  player_two_answer: '0field' | '1field';
  player_two_answer_readable: Answer;
  game_address: string;
  opponent: string;
  wagerAmount: number;
  wagerRecord: string;
}