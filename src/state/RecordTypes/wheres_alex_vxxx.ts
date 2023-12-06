import { RecordWithPlaintext, zodAddress } from '@puzzlehq/sdk';
import { z } from 'zod';

export enum Answer {
  InTheWeeds = 'In the Weeds',
  BehindTheBuilding = 'Behind the Building',
}

export const getAnswer = (answer: '0field' | '1field') =>
  answer === '0field' ? Answer.InTheWeeds : Answer.BehindTheBuilding;

export const GameRecordSchema = z.object({
  owner: zodAddress,
  challenger_commit: z.string(),
  opponent_answer: z.enum(['0field', '1field']),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  game_multisig: zodAddress,
  game_state: z.enum([
    '0field',
    '1field',
    '2field',
    '3field',
    '4field',
    '5field',
    '6field',
  ]),
  ix: z.literal('1u32'),
  _nonce: z.string(),
});
export type GameRecord = {
  recordData: z.infer<typeof GameRecordSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameReqNotificationSchema = z.object({
  owner: zodAddress,
  game_multisig: zodAddress,
  game_state: z.literal('1field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal('2u32'),
  _nonce: z.string(),
});
export type GameReqNotification = {
  recordData: z.infer<typeof GameReqNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const WaitingAcceptanceNotificationSchema = z.object({
  owner: zodAddress, // challenger
  game_multisig: zodAddress,
  game_state: z.literal('1field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal('3u32'),
  _nonce: z.string(),
});
export type WaitingAcceptanceNotification = {
  recordData: z.infer<typeof WaitingAcceptanceNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const StakeRenegedNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('0field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  renege_address: zodAddress,
  ix: z.literal('4u32'),
  _nonce: z.string(),
});
export type StakeRenegedNotification = {
  recordData: z.infer<typeof StakeRenegedNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const ChallengerWagerNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('2field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal('5u32'),
  _nonce: z.string(),
});
export type ChallengerWagerNotification = {
  recordData: z.infer<typeof ChallengerWagerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const OpponentWagerNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('2field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal('6u32'),
  _nonce: z.string(),
});
export type OpponentWagerNotification = {
  recordData: z.infer<typeof OpponentWagerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const WaitingRevealNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('3field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal('7u32'),
  _nonce: z.string(),
});
export type WaitingRevealNotification = {
  recordData: z.infer<typeof WaitingRevealNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const RevealAnswerNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('3field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  opponent_answer: z.enum(['0field', '1field']),
  ix: z.literal('8u32'),
  _nonce: z.string(),
});
export type RevealAnswerNotification = {
  recordData: z.infer<typeof RevealAnswerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameFinishReqNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal('4field'),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  challenger_answer: z.enum(['0field', '1field']),
  opponent_answer: z.enum(['0field', '1field']),
  winner: zodAddress,
  loser: zodAddress,
  ix: z.literal('9u32'),
  _nonce: z.string(),
});
export type GameFinishReqNotification = {
  recordData: z.infer<typeof GameFinishReqNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameFinishedNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.enum(['5field', '6field']),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  winner: zodAddress,
  loser: zodAddress,
  ix: z.literal('10u32'),
  _nonce: z.string(),
});
export type GameFinishedNotification = {
  recordData: z.infer<typeof GameFinishedNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export type GameNotification =
  | GameReqNotification
  | WaitingAcceptanceNotification
  | StakeRenegedNotification
  | ChallengerWagerNotification
  | OpponentWagerNotification
  | WaitingRevealNotification
  | RevealAnswerNotification
  | GameFinishReqNotification
  | GameFinishedNotification;

export const removeVisibilitySuffix = (obj: { [key: string]: string }) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key]
        .replace('.private', '')
        .replace('.public', '')
        .replace('u64', '');
    }
  }
  return obj;
};

export type GameState =
  | 'challenger:0'
  | 'challenger:1'
  | 'challenger:2'
  | 'challenger:3'
  | 'challenger:5'
  | 'challenger:6'
  | 'opponent:0'
  | 'opponent:1'
  | 'opponent:2'
  | 'opponent:3'
  | 'opponent:5'
  | 'opponent:6'
  | 'winner:4'
  | 'loser:4';

export const getGameState = (game: GameNotification): GameState => {
  const challenger_or_opponent =
    game.recordData.challenger_address === game.recordData.owner
      ? 'challenger'
      : 'opponent';

  switch (game.recordData.ix) {
    case '2u32':
      return `opponent:1`;
    case '3u32':
      return `challenger:1`;
    case '4u32':
      return `${challenger_or_opponent}:0`;
    case '5u32':
      return `challenger:2`;
    case '6u32':
      return `opponent:2`;
    case '7u32':
      return `opponent:3`;
    case '8u32':
      return `challenger:3`;
    case '9u32': {
      const isWinner = game.recordData.winner === game.recordData.owner;
      return isWinner ? `winner:4` : `loser:4`;
    }
    case '10u32':
      return `${challenger_or_opponent}:5`;
    default:
      return 'challenger:0';
  }
};

export type GameAction =
  | 'Renege'
  | 'Reveal'
  | 'Claim'
  | 'Accept'
  | 'Submit Wager'
  | 'Ping'
  | 'Claim'
  | 'Lose'
  | undefined;

export const getGameAction = (gameState: GameState): GameAction => {
  switch (gameState) {
    case 'challenger:0':
      return undefined;
    case 'challenger:1':
      return 'Renege'; // and ping
    case 'challenger:2':
      return 'Renege'; // and ping
    case 'challenger:3':
      return 'Reveal';
    case 'winner:4':
      return 'Claim';
    case 'loser:4':
      return 'Lose';
    case 'challenger:5':
      return undefined;
    case 'challenger:6':
      return undefined;
    case 'opponent:0':
      return undefined;
    case 'opponent:1':
      return 'Submit Wager';
    case 'opponent:2':
      return 'Accept';
    case 'opponent:3':
      return 'Ping';
    case 'opponent:5':
      return undefined;
    case 'opponent:6':
      return undefined;
  }
};

export const parseGameRecord = (
  recordWithPlaintext: RecordWithPlaintext
): GameNotification | undefined => {
  const schemas = [
    GameReqNotificationSchema,
    WaitingAcceptanceNotificationSchema,
    StakeRenegedNotificationSchema,
    ChallengerWagerNotificationSchema,
    OpponentWagerNotificationSchema,
    WaitingRevealNotificationSchema,
    RevealAnswerNotificationSchema,
    GameFinishReqNotificationSchema,
    GameFinishedNotificationSchema,
  ];

  for (const schema of schemas) {
    try {
      const result = schema.parse(
        removeVisibilitySuffix(recordWithPlaintext.data)
      );
      return {
        recordData: result,
        recordWithPlaintext: recordWithPlaintext,
      } as GameNotification;
    } catch {}
  }
  return undefined;
};

// game_state
// 0field - StakeRenegedNotification
// 1field - ChallengerWagerNotification, OpponentWagerNotification
// 2field - WaitingRevealNotification, RevealAnswerNotification, GameFinishReqNotification
// 3field - GameFinishedNotification
