import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Step {
  _01_Claim,
  _02_GameOver,
}

type RenegeStore = {
  opponent?: string;
  wager?: number;
  initialize: (opponent: string, wager: number) => void;
  renege: () => Promise<void>;
  close: () => void;
};

export const useRenegeStore = create<RenegeStore>()(
  persist(
    (set) => ({
      opponent: undefined,
      wager: undefined,
      initialize: (opponent: string, wager: number) => {
        set({ opponent, wager });
      },
      renege: async () => {},
      close: () => {
        set({
          opponent: '',
          wager: 0,
        });
      },
    }),
    {
      name: 'renege',
    }
  )
);
