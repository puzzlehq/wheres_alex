import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecordWithPlaintext } from '@puzzlehq/sdk';
import {
  GameAction,
  GameNotification,
  GameState,
  getGameAction,
  getGameState,
  parseGameRecord,
} from './RecordTypes/wheres_alex_vxxx';
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
        const amount = record.data?.amount?.replace('u64.private', '');
        if (amount && record.data?.ix === '0u32.private') {
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
};

export type Game = {
  gameNotification: GameNotification;
  gameState: GameState;
  gameAction?: GameAction;
  utilRecords: RecordWithPlaintext[];
  msRecords?: MSGameRecords;
};

export type MSGameRecords = {
  gameRecords: RecordWithPlaintext[];
  puzzleRecords: RecordWithPlaintext[];
  utilRecords: RecordWithPlaintext[];
};

type GameStore = {
  currentGame?: Game;
  yourTurn: Game[];
  theirTurn: Game[];
  finished: Game[];
  puzzleRecords: RecordWithPlaintext[];
  availableBalance: number;
  totalBalance: number;
  largestPiece?: RecordWithPlaintext;
  setRecords: (
    user: string,
    records: {
      gameNotifications: RecordWithPlaintext[];
      utilRecords: RecordWithPlaintext[];
      puzzleRecords: RecordWithPlaintext[];
    },
    msRecords?: MSGameRecords
  ) => void;
  setCurrentGame: (game?: Game) => void;
  close: () => void;
  clearFlowStores: () => void;
};

const createGame = (
  gameNotification: GameNotification,
  utilRecords: RecordWithPlaintext[],
  user: string,
  msRecords?: MSGameRecords
): Game => {
  const gameState = getGameState(gameNotification, user);
  return {
    gameNotification,
    gameState: gameState,
    gameAction: getGameAction(gameState),
    utilRecords: utilRecords.filter(
      (utilRecord) =>
        utilRecord.data.game_multisig?.replace('.private', '') ===
        gameNotification.recordData.game_multisig
    ),
    msRecords: msRecords
      ? {
          gameRecords: msRecords.gameRecords.filter(
            (gameRecord) =>
              gameRecord.owner ===
              gameNotification.recordData.game_multisig
          ),
          puzzleRecords: msRecords.puzzleRecords.filter(
            (puzzleRecord) =>
              puzzleRecord.owner ===
              gameNotification.recordData.game_multisig
          ),
          utilRecords: msRecords.utilRecords.filter(
            (utilRecord) =>
              utilRecord.owner ===
              gameNotification.recordData.game_multisig
          ),
        }
      : undefined,
  };
};

const validStates = {
  yourTurn: new Set([
    'opponent:1',
    'opponent:2',
    'opponent:4:win',
    'challenger:3',
    'challenger:4:win',
  ]),
  theirTurn: new Set(['opponent:3', 'challenger:1', 'challenger:2']),
  finished: new Set([
    'opponent:0',
    'opponent:4:lose',
    'opponent:5',
    'opponent:6',
    'challenger:0',
    'challenger:4:lose',
    'challenger:5',
    'challenger:6',
  ]),
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
      setRecords: (user, records, msRecords) => {
        const currentGame = get().currentGame;

        const utilRecords = records.utilRecords;

        const puzzleRecords = records.puzzleRecords;
        const { availableBalance, totalBalance, largestPiece } =
          parsePuzzlePieces(puzzleRecords);
        set({ availableBalance, totalBalance, largestPiece });

        const gameNotifications: GameNotification[] = records.gameNotifications
          .map((record) => {
            const gameNotification: GameNotification | undefined =
              parseGameRecord(record);
            if (!gameNotification) return;
            return gameNotification;
          })
          .filter((record): record is GameNotification => record !== undefined);

        const { yourTurn, theirTurn, finished } = gameNotifications.reduce<{
          yourTurn: Game[];
          theirTurn: Game[];
          finished: Game[];
        }>(
          (acc, gameNotification) => {
            const game_state = getGameState(gameNotification, user);
            const game = createGame(
              gameNotification,
              utilRecords,
              user,
              msRecords
            );
            if (
              game.gameNotification.recordData.game_multisig ===
              currentGame?.gameNotification.recordData.game_multisig
            ) {
              set({
                currentGame: game,
              });
            }
            if (validStates.yourTurn.has(game_state)) {
              acc.yourTurn.push(game);
            } else if (validStates.theirTurn.has(game_state)) {
              acc.theirTurn.push(game);
            } else if (validStates.finished.has(game_state)) {
              acc.finished.push(game);
            }
            return acc;
          },
          { yourTurn: [], theirTurn: [], finished: [] }
        );

        set({ yourTurn, theirTurn, finished });
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
      },
    }),
    {
      name: 'game-manager',
    }
  )
);
