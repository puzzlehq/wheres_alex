import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { z } from 'zod'

export enum Answer {
  InTheWeeds = 'In the Weeds',
  BehindTheBuilding = 'Behind the Building',
}

export const GameRecordSchema = z.object({
  owner: z.string(), // opponent address
  game_multisig: z.string(), // multisig address
  game_state: z.enum(['0field', '1field', '2field', '3field', '4field', '5field', '6field']), 
  your_turn: z.string(),
  total_pot: z.string().transform(Number),
  challenger_address: z.string(),
  opponent_address: z.string(),
  _nonce: z.string(),
  winner: z.string().optional(), // if 3field
  loser: z.string().optional(), // if 3field
  renege_address: z.string().optional(), // if 0field
  opponent_answer: z.string().optional() // if 2field
})

export type GameRecord = z.infer<typeof GameRecordSchema>;

export const removeVisibilitySuffix = (obj: {
  [key: string]: string;
}) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace('.private', '').replace('.public', '').replace('u64', '');
    }
  }
  return obj;
}

export type GameState =
  'challenger:0'
  | 'challenger:1'
  | 'challenger:2'
  | 'challenger:3'
  | 'challenger:4:lose'
  | 'challenger:4:win'
  | 'challenger:5'
  | 'challenger:6'
  | 'opponent:0'
  | 'opponent:1'
  | 'opponent:2'
  | 'opponent:3'
  | 'opponent:4:lose'
  | 'opponent:4:win'
  | 'opponent:5'
  | 'opponent:6'

export const getGameState = (game: GameRecord, user: string): GameState => {
  const challenger_or_opponent = user === game.challenger_address ? 'challenger' : 'opponent';
  const isWinner = user === game.winner;

  switch (game.game_state) {
    case ('0field'): return `${challenger_or_opponent}:0`;
    case ('1field'): return `${challenger_or_opponent}:1`;
    case ('2field'): return `${challenger_or_opponent}:2`;
    case ('3field'): return `${challenger_or_opponent}:3`;
    case ('4field'): return isWinner ? `${challenger_or_opponent}:4:win` : `${challenger_or_opponent}:4:lose`;
    case ('5field'): return `${challenger_or_opponent}:5`;
    case ('6field'): return `${challenger_or_opponent}:6`;
  }
}

export type GameAction = 'Renege' | 'Reveal' | 'Claim' | 'Accept' | 'Submit Wager' | 'Ping' | 'Claim' | undefined

export const getGameAction = (gameState: GameState): GameAction => {
  switch (gameState) {
    case ('challenger:0'): return undefined 
    case ('challenger:1'): return 'Renege' // and ping
    case ('challenger:2'): return 'Renege' // and ping
    case ('challenger:3'): return 'Reveal' 
    case ('challenger:4:lose'): return undefined
    case ('challenger:4:win'): return 'Claim'
    case ('challenger:5'): return undefined
    case ('challenger:6'): return undefined
    case ('opponent:0'): return undefined
    case ('opponent:1'): return 'Submit Wager'
    case ('opponent:2'): return 'Accept' 
    case ('opponent:3'): return 'Ping'
    case ('opponent:4:lose'): return undefined 
    case ('opponent:4:win'): return 'Claim'
    case ('opponent:5'): return undefined
    case ('opponent:6'): return undefined 
  }
}

export const parseGameRecord = (record: RecordWithPlaintext) => {
  const result = GameRecordSchema.parse(
    removeVisibilitySuffix(record.data)
  );

  return result as GameRecord;
};


// game_state
// 0field - StakeRenegedNotification
// 1field - ChallengerWagerNotification, OpponentWagerNotification
// 2field - WaitingRevealNotification, RevealAnswerNotification, GameFinishReqNotification
// 3field - GameFinishedNotification