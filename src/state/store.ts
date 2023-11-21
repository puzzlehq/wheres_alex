import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from './manager';
import { Record } from '@puzzlehq/sdk';
import _ from 'lodash';

type GameStore = {
  currentGame?: Game;
  games: Game[];
  gameRecords: Record[];
  puzzleRecords: Record[];
  utilRecords: Record[];
  puzzleBalance: number;
  setRecords: (records: {
    gameRecords: Record[];
    utilRecords: Record[];
    puzzleRecords: Record[];
  }) => void;
  close: () => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentGame: undefined,
      games: [],
      gameRecords: [],
      puzzleRecords: [],
      utilRecords: [],
      puzzleBalance: 0,
      setRecords: (records) => {
        const gameRecords = records.gameRecords;
        const utilRecords = records.utilRecords;
        const puzzleRecords = records.puzzleRecords;
        const groupedRecords = _.keyBy(records, 'game_address');
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
