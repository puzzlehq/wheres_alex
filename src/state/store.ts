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

const parsePuzzlePieces = (records: RecordWithPlaintext[]) => {
  if (records.length > 0) {
    let availableBalance = 0;
    let largestPiece = records[0];
    const totalBalance = records
      .filter((record) => !record.spent)
      .map((record) => {
        const amount = record.data.amount.replace('u64.private', '');
        if (amount) {
          /// find largestPiece (and thus availableBalance)
          const amountInt = parseInt(amount);
          availableBalance = Math.max(availableBalance, amountInt);
          if (availableBalance == amountInt) {
            largestPiece = record;
          }
          return amountInt;
        }
        return 0;
      })
      .reduce((total, amount) => {
        /// sum up
        return total + amount;
      });
    return { totalBalance, availableBalance, largestPiece };
  }
  return { totalBalance: 0, availableBalance: 0, largestPiece: undefined };
}

export type Game = {
  gameRecord: GameRecord,
  gameState: GameState,
  gameAction?: GameAction,
  utilRecords: RecordWithPlaintext[],
  msRecords?: {
    gameRecords: RecordWithPlaintext[],
    puzzleRecords: RecordWithPlaintext[],
    utilRecords: RecordWithPlaintext[]
  }
}

type GameStore = {
  currentGame?: Game;
  yourTurn: Game[];
  theirTurn: Game[];
  finished: Game[];
  puzzleRecords: RecordWithPlaintext[];
  availableBalance: number;
  totalBalance: number;
  largestPiece?: RecordWithPlaintext;
  setRecords: (records: {
    gameRecords: RecordWithPlaintext[];
    utilRecords: RecordWithPlaintext[];
    puzzleRecords: RecordWithPlaintext[];
  }, user: string) => void;
  setMsRecords: (records: {
    msGameRecords: RecordWithPlaintext[];
    msUtilRecords: RecordWithPlaintext[];
    msPuzzleRecords: RecordWithPlaintext[];
  }, game_multisig: string) => void;
  setCurrentGame: (game?: Game) => void;
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
      availableBalance: 0,
      totalBalance: 0,
      largestPiece: undefined,
      setRecords: (records, user) => {
        const currentGame = get().currentGame;
        
        const utilRecords = records.utilRecords;

        const puzzleRecords = records.puzzleRecords;
        const { availableBalance, totalBalance, largestPiece } = parsePuzzlePieces(puzzleRecords);
        set({ availableBalance, totalBalance, largestPiece });

        const gameRecords: GameRecord[] = records.gameRecords.map((record) => {
          const gameRecord: GameRecord = parseGameRecord(record);

          if (gameRecord.recordData.game_multisig === currentGame?.gameRecord.recordData.game_multisig) {
            const gameState = getGameState(gameRecord, user);
            set({
              currentGame: {
                gameRecord,
                gameState,
                gameAction: getGameAction(gameState),
                utilRecords: utilRecords.filter((utilRecord) => utilRecord.data.game_multisig.replace('.private', '') === gameRecord.recordData.game_multisig)
              }
            })
          }
          return gameRecord;
        }
        ).filter((record): record is GameRecord => record !== undefined);

        const yourTurn: Game[] = gameRecords.filter((gameRecord) => {
          const game_state = getGameState(gameRecord, user);
          return ['opponent:1', 'opponent:2', 'opponent:4:win', 'challenger:3', 'challenger:4:win'].includes(game_state);
        }).map((gameRecord) => {
          const gameState = getGameState(gameRecord, user);

          return {
            gameRecord: gameRecord,
            gameState: gameState,
            gameAction: getGameAction(gameState),
            utilRecords: utilRecords.filter((utilRecord) => utilRecord.data.game_multisig.replace('.private', '') === gameRecord.recordData.game_multisig)
          }
        })

        const theirTurn: Game[] = gameRecords.filter((gameRecord) => {
          const game_state = getGameState(gameRecord, user);
          return ['opponent:3', 'challenger:1', 'challenger:2'].includes(game_state);
        }).map((gameRecord) => {
          const gameState = getGameState(gameRecord, user);

          return {
            gameRecord: gameRecord,
            gameState: gameState,
            gameAction: getGameAction(gameState),
            utilRecords: utilRecords.filter((utilRecord) => utilRecord.data.game_multisig.replace('.private', '') === gameRecord.recordData.game_multisig)
          }
        })

        const finished: Game[] = gameRecords.filter((gameRecord) => {
          const game_state = getGameState(gameRecord, user);
          return ['opponent:0', 'opponent:4:lose', 'opponent:5', 'opponent:6', 'challenger:0', 'challenger:4:lose', 'challenger:5', 'challenger:6'].includes(game_state);
        }).map((gameRecord) => {
          const gameState = getGameState(gameRecord, user);

          return {
            gameRecord: gameRecord,
            gameState: gameState,
            gameAction: getGameAction(gameState),
            utilRecords: utilRecords.filter((utilRecord) => utilRecord.data.game_multisig.replace('.private', '') === gameRecord.recordData.game_multisig)
          }
        })

        set({ yourTurn, theirTurn, finished });
      },
      setMsRecords: (records, game_multisig) => {
        const currentGame = get().currentGame;
        if (currentGame?.gameRecord.recordData.game_multisig !== game_multisig) return;
      },
      setCurrentGame: (game?: Game) => {
        set({ currentGame: game });
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
        set({ currentGame: undefined });
      }
    }),
    {
      name: 'game-manager',
    }
  )
);
