import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { z } from 'zod'

export enum Answer {
  InTheWeeds = 'In the Weeds',
  BehindTheBuilding = 'Behind the Building',
}

export const GameRecordSchema = z.object({
  owner: z.string(), // opponent address
  game_multisig: z.string(), // multisig address
  game_state: z.enum(['0field', '1field', '2field', '3field']), 
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

export type GameState = 'challenger:0'
  | 'challenger:1'
  | 'challenger:2:lose'
  | 'challenger:2:win'
  | 'challenger:3'
  | 'opponent:0'
  | 'opponent:1'
  | 'opponent:2:lose'
  | 'opponent:2:win'
  | 'opponent:3'

export const getGameState = (game: GameRecord, user: string): GameState => {
  const isChallenger = user === game.challenger_address;
  const isWinner = user === game.winner;

  if (isChallenger) {
    switch (game.game_state) {
      case ('0field'): return 'challenger:0';
      case ('1field'): return 'challenger:1';
      case ('2field'): return isWinner ? 'challenger:2:win' : 'challenger:2:lose';
      case ('3field'): return 'challenger:3';
    }
  } else {
    switch (game.game_state) {
      case ('0field'): return 'opponent:0';
      case ('1field'): return 'opponent:1';
      case ('2field'): return isWinner ? 'opponent:2:win' : 'opponent:2:lose';
      case ('3field'): return 'opponent:3';
    }
  }
}

export type GameAction = 'Renege' | 'Reveal' | 'Claim' | 'Accept' | 'Ping' | 'Claim' | undefined

export const getGameAction = (gameState: GameState): GameAction => {
  switch (gameState) {
    case ('challenger:0'): return 'Renege' // and ping
    case ('challenger:1'): return 'Reveal'
    case ('challenger:2:lose'): return undefined
    case ('challenger:2:win'): return 'Claim'
    case ('challenger:3'): return undefined
    case ('opponent:0'): return 'Accept'
    case ('opponent:1'): return 'Ping'
    case ('opponent:2:lose'): return undefined
    case ('opponent:2:win'): return 'Claim'
    case ('opponent:3'): return undefined
  }
}

export const parseGameRecord = (record: RecordWithPlaintext) => {
  const result = GameRecordSchema.parse(
    removeVisibilitySuffix(record.data)
  );

  console.log('result', result);
  console.log('removedResult', removeVisibilitySuffix(record.data));

  return result as GameRecord;
};


// game_state
// 0field - StakeRenegedNotification
// 1field - ChallengerWagerNotification, OpponentWagerNotification
// 2field - WaitingRevealNotification, RevealAnswerNotification, GameFinishReqNotification
// 3field - GameFinishedNotification