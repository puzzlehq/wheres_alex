import NewGamePage from './_01_NewGame';
import HideAlex from "./_02_HideAlex";
import StartWager from "./_03_StartWager";
import ConfirmStartGame from "./_04_ConfirmStartGame";
import GameStarted from "./_05_GameStarted";
import { useEffect, useState } from "react";
import { ProposeGameInputs } from "../../state/manager";
import { useImportSharedState } from "@puzzlehq/sdk";
import { atom, useAtom } from 'jotai';
import { PrivateKey } from '@puzzlehq/aleo-wasm-web';

export type Step = '1_NewGame' | '2_HideAlex' | '3_StartWager' | '4_ConfirmStartGame' | '5_GameStarted';
export const proposeGameInputsAtom = atom<Partial<ProposeGameInputs & {step: Step}>>({step: '1_NewGame', opponent: ''});

const NewGame = () => {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);
  const [seed, setSeed] = useState<string | undefined>();

  useEffect(() => {
    const s = new Uint8Array(32);
    crypto.getRandomValues(s);
    const privateKey = PrivateKey.from_seed_unchecked(s);
    /// get fields of privateKey from WASM
    setSeed(privateKey.to_seed());
  }, [])

  const { importSharedState, address } = useImportSharedState(seed ?? '');

  useEffect(() => {
    if (seed !== undefined) {
      importSharedState();
    }
  }, [seed])


  useEffect(() => {
    console.log('seed 1', seed);
    console.log('address', address);
    if (!seed || !address) return;
    try {
      setProposeGameInputs({ ...proposeGameInputs, seed: seed, game_address: address });
    } catch (e) {
      console.error(e)
    }
  }, [seed, address])

  const step = proposeGameInputs.step ?? '1_NewGame' as Step;

  return (
    <div className="flex flex-col h-full w-full">
      {step === '1_NewGame' && <NewGamePage />}
      {step === '2_HideAlex' && <HideAlex />}
      {step === '3_StartWager' && <StartWager />}
      {step === '4_ConfirmStartGame' && <ConfirmStartGame />}
      {step === '5_GameStarted' && <GameStarted />} 
    </div>
  )
}

export default NewGame