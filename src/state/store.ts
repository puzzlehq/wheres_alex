import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecordWithPlaintext } from '@puzzlehq/sdk';
import { GameAction, GameRecord, GameState, getGameAction, getGameState, parseGameRecord } from './RecordTypes/wheres_alex_vxxx';
import { useRenegeStore } from '../pages/Renege/store';
import { useAcceptGameStore } from '../pages/AcceptGame/store';
import { useNewGameStore } from '../pages/NewGame/store';
import { useClaimPrizeLoseStore } from '../pages/ClaimPrize/Lose/store';
import { useClaimPrizeWinStore } from '../pages/ClaimPrize/Win/store';
import { useClaimPrizeNoShowStore } from '../pages/ClaimPrize/NoShow/store';
import { useFinishGameStore } from '../pages/FinishGame/store';

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
  clearFlowStores: () => void;
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
          return ['opponent:1', 'opponent:2', 'opponent:4:win', 'challenger:3', 'challenger:4:win'].includes(game_state);
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
          return ['opponent:3', 'challenger:1', 'challenger:2'].includes(game_state);
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
          return ['opponent:0', 'opponent:4:lose', 'opponent:5', 'opponent:6', 'challenger:0', 'challenger:4:lose', 'challenger:5', 'challenger:6'].includes(game_state);
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
      clearFlowStores: () => {
        useNewGameStore.getState().close();
        useAcceptGameStore.getState().close();
        useRenegeStore.getState().close();
        useClaimPrizeLoseStore.getState().close();
        useClaimPrizeWinStore.getState().close();
        useClaimPrizeNoShowStore.getState().close();
        useFinishGameStore.getState().close();
      }
    }),
    {
      name: 'game-manager',
    }
  )
);
