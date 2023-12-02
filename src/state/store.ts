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
import { Step, useAcceptGameStore } from '../pages/AcceptGame/store';
import { useNewGameStore } from '../pages/NewGame/store';
import { useClaimPrizeLoseStore } from '../pages/ClaimPrize/Lose/store';
import { useClaimPrizeWinStore } from '../pages/ClaimPrize/Win/store';
import { useFinishGameStore } from '../pages/FinishGame/store';
import _ from 'lodash';

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
  puzzleRecords: RecordWithPlaintext[];
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
  puzzleRecords: RecordWithPlaintext[],
  utilRecords: RecordWithPlaintext[],
  user: string,
  msRecords?: MSGameRecords
): Game => {
  const gameState = getGameState(gameNotification, user);
  return {
    gameNotification,
    gameState: gameState,
    gameAction: getGameAction(gameState),
    puzzleRecords: puzzleRecords.filter(
      (puzzleRecord) =>
        puzzleRecord.data.game_multisig?.replace('.private', '') ===
        gameNotification.recordData.game_multisig
    ),
    utilRecords: utilRecords.filter(
      (utilRecord) =>
        utilRecord.data.game_multisig?.replace('.private', '') ===
        gameNotification.recordData.game_multisig
    ),
    msRecords: msRecords
      ? {
          gameRecords: msRecords.gameRecords.filter(
            (gameRecord) =>
              gameRecord.owner === gameNotification.recordData.game_multisig
          ),
          puzzleRecords: msRecords.puzzleRecords.filter(
            (puzzleRecord) =>
              puzzleRecord.owner === gameNotification.recordData.game_multisig
          ),
          utilRecords: msRecords.utilRecords.filter(
            (utilRecord) =>
              utilRecord.owner === gameNotification.recordData.game_multisig
          ),
        }
      : undefined,
  };
};

const validStates = {
  challengerTurn: new Set([
    'challenger:1', // challenger to ping opponent to submit wager
    'challenger:2', // challenger to ping opponent to accept game
    'challenger:3', // challenger to reveal answer
    'challenger:4:lose', // challenger to view revealed answer (finish as well)
    'challenger:4:win', // challenger to claim prize
  ]),
  opponentTurn: new Set([
    'opponent:1', // opponent to submit wager
    'opponent:2', // opponent to accept game
    'opponent:3', // opponent to ping challenger to reveal answer
    'opponent:4:lose', // opponent to view revealed answer (finish as well)
    'opponent:4:win', // opponent to claim prize
  ]),
  finished: new Set([
    'opponent:0',
    'opponent:5',
    'opponent:6',
    'challenger:0',
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

        const allGameNotifications: GameNotification[] =
          records.gameNotifications
            .map((record) => {
              const gameNotification: GameNotification | undefined =
                parseGameRecord(record);
              if (!gameNotification) return;
              return gameNotification;
            })
            .filter(
              (record): record is GameNotification => record !== undefined
            );

        const gameNotificationsByGameAddress = _.groupBy(
          allGameNotifications,
          'recordData.game_multisig'
        );
        const gameNotifications = _.values(gameNotificationsByGameAddress).map(
          (notifications) => {
            if (notifications.length === 1) return notifications[0];
            else {
              const reneged = notifications.find(
                (n) => n.recordData.game_state === '0field'
              );
              if (reneged) return reneged;
              const sorted = _.orderBy(
                notifications,
                'recordData.game_state',
                'desc'
              );
              return sorted[0];
            }
          }
        );
        console.log('gameNotifications', gameNotifications);

        const { yourTurn, theirTurn, finished } = gameNotifications.reduce<{
          yourTurn: Game[];
          theirTurn: Game[];
          finished: Game[];
        }>(
          (acc, gameNotification) => {
            const game_state = getGameState(gameNotification, user);
            const game = createGame(
              gameNotification,
              puzzleRecords,
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
            const isChallenger = game_state.includes('challenger');
            if (isChallenger) {
              if (validStates.challengerTurn.has(game_state)) {
                acc.yourTurn.push(game);
              } else if ( validStates.opponentTurn.has(game_state)) {
                acc.theirTurn.push(game);
              } else {
                acc.finished.push(game);
              }
            } else {
              if (validStates.opponentTurn.has(game_state)) {
                acc.yourTurn.push(game);
              } else if (validStates.challengerTurn.has(game_state)) {
                acc.theirTurn.push(game);
              } else  {
                acc.finished.push(game);
              }
            }
            return acc;
          },
          { yourTurn: [], theirTurn: [], finished: [] }
        );

        set({ yourTurn, theirTurn, finished });
      },
      setCurrentGame: (game?: Game) => {
        set({ currentGame: game });
        switch (game?.gameAction) {
          case 'Submit Wager':
            useAcceptGameStore.getState().setStep(Step._01_SubmitWager);
            break;
          case 'Accept':
            useAcceptGameStore.getState().setStep(Step._02_AcceptGame);
            break;
        }
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
        useFinishGameStore.getState().close();
        set({ currentGame: undefined });
      },
    }),
    {
      name: 'game-manager',
    }
  )
);
