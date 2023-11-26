import { RecordWithPlaintext } from '@puzzlehq/sdk';
import {
  Answer,
} from './RecordTypes/wheres_alex_vxxx';

export const GAME_PROGRAM_ID = 'wheres_alex_v011.aleo';

export const GAME_FUNCTIONS = {
  propose_game: 'propose_game',
  accept_game: 'accept_game',
  submit_wager: 'submit_wager',
  reveal_answer: 'reveal_answer',
  finish_game: 'finish_game',
};

/// todo - update these
export const stepFees = {
  propose_game: 20,
  accept_game: 1,
  submit_wager: 1,
  reveal_answer: 1,
  finish_game: 1,
};

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type ProposeGameInputs = {
  wagerRecord: RecordWithPlaintext;
  wagerAmount: string;
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
  answer: string;
  seed: string;
};

export type SubmitWagerInputs = {
  wager_record: RecordWithPlaintext,
  key_record: RecordWithPlaintext,
  game_req_notification: RecordWithPlaintext,
  message_1: string, //from output of useSignature
  message_2: string,
  message_3: string,
  message_4: string,
  message_5: string,
  sig: string, //from output of useSignature
}

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
  game_multisig: string;
  opponent: string;
  wagerAmount: string;
  wagerRecord: string;
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

