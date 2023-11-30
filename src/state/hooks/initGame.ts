import { useAccount } from '@puzzlehq/sdk';
import { useEffect } from 'react';
import { useGameStore } from '../store';
import { useGameRecords } from './records';
import { useMsRecords } from './msRecords';

export const useInitGame = () => {
  const { account } = useAccount();

  const [currentGame, setRecords] = useGameStore((state) => [
    state.currentGame,
    state.setRecords,
  ]);
  const current_game_multisig =
    currentGame?.gameNotification.recordData.game_multisig;

  const { gameNotifications, puzzleRecords, utilRecords } = useGameRecords();
  const { msGameRecords, msPuzzleRecords, msUtilRecords } = useMsRecords(
    current_game_multisig
  );

  console.log('current_game_multisig', current_game_multisig);

  useEffect(() => {
    if (
      gameNotifications !== undefined &&
      puzzleRecords !== undefined &&
      utilRecords !== undefined &&
      account
    ) {
      setRecords(
        account.address,
        { gameNotifications, puzzleRecords, utilRecords },
        {
          gameRecords: msGameRecords ?? [],
          puzzleRecords: msPuzzleRecords ?? [],
          utilRecords: msUtilRecords ?? [],
        }
      );
    }
  }, [
    [gameNotifications, puzzleRecords, utilRecords].toString(),
    [msGameRecords, msPuzzleRecords, msUtilRecords].toString(),
    current_game_multisig,
    account?.address,
  ]);
};
