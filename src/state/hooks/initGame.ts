import { useAccount } from "@puzzlehq/sdk";
import { useEffect } from "react";
import { useGameStore } from "../store";
import { useGameRecords } from "./records";
import { useMsRecords } from "./msRecords";

export const useInitGame = () => {
  const { account } = useAccount();

  const [currentGame, setRecords, setMsRecords] = useGameStore((state) => [state.currentGame, state.setRecords, state.setMsRecords]);
  const current_game_multisig = currentGame?.gameRecord.recordData.game_multisig;

  const { gameRecords, puzzleRecords, utilRecords } = useGameRecords();
  const { msGameRecords, msPuzzleRecords, msUtilRecords } = useMsRecords(current_game_multisig);

  useEffect(() => {
    if (
      msGameRecords !== undefined &&
      msPuzzleRecords !== undefined &&
      msUtilRecords !== undefined &&
      current_game_multisig
    ) {
      console.log('msGameRecords', msGameRecords);
      console.log('msPuzzleRecords', msPuzzleRecords);
      console.log('msUtilRecords', msUtilRecords);
      console.log('current_game_multisig', current_game_multisig);
      setMsRecords({
        msGameRecords, msPuzzleRecords, msUtilRecords
      }, current_game_multisig)
    }
  }, [msGameRecords, msPuzzleRecords, msUtilRecords, current_game_multisig])

  useEffect(() => {
    if (
      gameRecords !== undefined &&
      puzzleRecords !== undefined &&
      utilRecords !== undefined &&
      account
    ) {
      console.log('gameRecords', gameRecords);
      console.log('puzzleRecords', puzzleRecords);
      console.log('utilRecords', utilRecords);
      console.log('account.address', account.address);

      setRecords({ gameRecords, puzzleRecords, utilRecords }, account.address);
    }
  }, [gameRecords, puzzleRecords, utilRecords, account]);
}