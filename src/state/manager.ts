import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { Answer } from './RecordTypes/wheres_alex_vxxx';

export const GAME_PROGRAM_ID = 'wheres_alex_v015.aleo';

export const GAME_FUNCTIONS = {
  propose_game: 'propose_game',
  accept_game: 'accept_game',
  submit_wager: 'submit_wager',
  reveal_answer: 'reveal_answer_game',
  finish_game: 'finish_game',
};

/// todo - update these
export const stepFees = {
  propose_game: 0.016078,
  accept_game: 0.029001,
  submit_wager: 1,
  reveal_answer: 0.008339,
  finish_game: 1,
};

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type ProposeGameInputs = {
  wager_record: RecordWithPlaintext;
  challenger_wager_amount: string;
  sender: string; // challenger address proposing game
  challenger: string;
  opponent: string;
  game_multisig: string;
  challenger_message_1: string;
  challenger_message_2: string;
  challenger_message_3: string;
  challenger_message_4: string;
  challenger_message_5: string;
  challenger_sig: string;
  challenger_nonce: string;
  challenger_answer: string;
  game_multisig_seed: string;
};

export type SubmitWagerInputs = {
  opponent_wager_record: RecordWithPlaintext;
  key_record: RecordWithPlaintext;
  game_req_notification: RecordWithPlaintext;
  opponent_message_1: string; //from output of useSignature
  opponent_message_2: string;
  opponent_message_3: string;
  opponent_message_4: string;
  opponent_message_5: string;
  opponent_sig: string; //from output of useSignature
};

// used for submit wager and accept game
export type AcceptGameInputs = {
  game_record: RecordWithPlaintext;
  opponent_answer: '0field' | '1field';
  opponent_answer_readable: Answer;
  piece_stake_challenger: RecordWithPlaintext;
  piece_claim_challenger: RecordWithPlaintext;
  piece_stake_opponent: RecordWithPlaintext;
  piece_claim_opponent: RecordWithPlaintext;
  block_ht: string;
};

export type RevealAnswerInputs = {
  reveal_answer_notification_record: RecordWithPlaintext;
  challenger_answer_record: RecordWithPlaintext;
  joint_piece_stake: RecordWithPlaintext;
  challenger_claim_signature: RecordWithPlaintext;
};

export type ClaimPrizeInputs = {
  AnswerRecord: RecordWithPlaintext;
  PieceStakeOutcome: string;
};