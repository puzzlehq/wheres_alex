import { useAccount } from '@puzzlehq/sdk';
import { useEffect } from 'react';
import { useGameStore } from '@state/gameStore';
import { useGameRecords } from './records';

export const useInitGame = () => {
  const { account } = useAccount();

  const [setRecords] = useGameStore((state) => [state.setRecords]);

  const { gameNotifications, puzzleRecords, utilRecords } = useGameRecords();

  useEffect(() => {
    if (
      gameNotifications !== undefined &&
      puzzleRecords !== undefined &&
      utilRecords !== undefined &&
      account
    ) {
      setRecords(account.address, {
        gameNotifications,
        puzzleRecords,
        utilRecords,
      });
    }
  }, [
    [gameNotifications, puzzleRecords, utilRecords].toString(),
    account?.address,
  ]);
};
