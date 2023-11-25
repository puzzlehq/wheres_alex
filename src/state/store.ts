import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { GameAction, GameRecord, GameState, getGameAction, getGameState, parseGameRecord } from './RecordTypes/wheres_alex_vxxx';

export type Game = {
  gameRecord: GameRecord,
  gameState: GameState,
  gameAction?: GameAction,
}

type GameStore = {
  currentGame?: GameRecord;
  yourTurn: Game[];
  theirTurn: Game[];
  finished: Game[];
  puzzleRecords: RecordWithPlaintext[];
  utilRecords: RecordWithPlaintext[];
  setRecords: (records: {
    gameRecords: RecordWithPlaintext[];
    utilRecords: RecordWithPlaintext[];
    puzzleRecords: RecordWithPlaintext[];
  }, user: string) => void;
  close: () => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentGame: undefined,
      yourTurn: [],
      theirTurn: [],
      finished: [],
      puzzleRecords: [],
      utilRecords: [],
      setRecords: (records, user) => {
        // const utilRecords = records.utilRecords
        // const puzzleRecords = records.puzzleRecords;
        const gameRecords: GameRecord[] = records.gameRecords.map((record) =>
          parseGameRecord(record)
        ).filter((record): record is GameRecord => record !== undefined);

        console.log(gameRecords);

        const yourTurn: Game[] = gameRecords.filter((record) => {
          const game_state = getGameState(record, user);
          return ['challenger:1', 'challenger:2:win', 'opponent:0', 'opponent:2:win'].includes(game_state);
        }).map((record) => {
          const gameState = getGameState(record, user);

          return {
            gameRecord: record,
            gameState: gameState,
            gameAction: getGameAction(gameState)
          }
        })

        const theirTurn: Game[] = gameRecords.filter((record) => {
          const game_state = getGameState(record, user);
          return ['challenger:0', 'opponent:1'].includes(game_state);
        }).map((record) => {
          const gameState = getGameState(record, user);

          return {
            gameRecord: record,
            gameState: gameState,
            gameAction: getGameAction(gameState)
          }
        })

        const finished: Game[] = gameRecords.filter((record) => {
          const game_state = getGameState(record, user);
          return ['challenger:2:lose', 'opponent:2:lose', 'challenger:3', 'opponent:3'].includes(game_state);
        }).map((record) => {
          const gameState = getGameState(record, user);

          return {
            gameRecord: record,
            gameState: gameState,
            gameAction: getGameAction(gameState)
          }
        })

        set({ yourTurn, theirTurn, finished });
      },
      close: () => {
        set({ currentGame: undefined });
      },
    }),
    {
      name: 'game-manager',
    }
  )
);
