import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { Answer } from './game_states';
import _ from 'lodash';

export const GAME_PROGRAM_ID = 'wheres_alex_v001.aleo';

export const GAME_FUNCTIONS = {
  propose_game: 'propose_game',
  accept_game: 'accept_game',
  set_wager: 'set_wager',
  reveal_answer: 'reveal_answer',
  finish_game: 'finish_game',
};

/// todo - update these
export const stepFees = {
  propose_game: 10,
  accept_game: 1,
  set_wager: 1,
  reveal_answer: 1,
  finish_game: 1,
};

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/// note: def more to come here
export type GameStep =
  | 'proposed'
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

  eventIds?: string[];
};

export type ProposeGameInputs = {
  wager_record: RecordWithPlaintext;
  wager_amount: string;
  sender_address: string;
  challenger: string;
  opponent: string;
  game_multisig: string;
  message_1: string;
  message_2: string;
  message_3: string;
  message_4: string;
  message_5: string;
  signature: string;
  nonce: string;
  player_one_answer: '0field' | '1field';
  player_one_answer_readable: Answer;
  seed: string;
};

// used for submit wager and accept game
export type AcceptGameInputs = {
  eventIdWager: string;
  eventIdAccept: string;
  gameRecord: RecordWithPlaintext;
  playerOneClaimRecord: RecordWithPlaintext;
  playerTwoClaimRecord: RecordWithPlaintext;
  puzz_piece_stake_one: RecordWithPlaintext;
  puzz_piece_stake_two: RecordWithPlaintext;
  player_two_answer: '0field' | '1field';
  player_two_answer_readable: Answer;
  game_address: string;
  opponent: string;
  wager_amount: string;
  wager_record: string;
};

export type RevealAnswerInputs = {
  AnswerRecord: RecordWithPlaintext;
  PieceStakeOutcome: string;
};
export type FinishGameInputs = {
  GameStateRevealedFinish: string;
  GameStateAwaitFinish: string;
  PieceJointStake: RecordWithPlaintext;
  PieceTimeClaim: RecordWithPlaintext;
};
