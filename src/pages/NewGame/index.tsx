import { Step, proposeGameInputsAtom } from "./store"
import NewGamePage from './_01_NewGame';
import HideAlex from "./_02_HideAlex";
import StartWager from "./_03_StartWager";
import ConfirmStartGame from "./_04_ConfirmStartGame";
import GameStarted from "./_05_GameStarted";
import React, { useEffect } from "react";
import { ProposeGameInputs } from "../../state/manager";
import { useCreateSharedState, useRequestCreateEvent } from "@puzzlehq/sdk";
import { useAtom } from 'jotai';
import { EventType } from "@puzzlehq/types";

const NewGame = (props: { create: (inputs: ProposeGameInputs) => void } ) => {
  // const [step] = useNewGameStore((state) => [
  //   state.step,
  // ]);

  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  const { createSharedState, seed } = useCreateSharedState();
  // export type CreateEventRequestData = {
  //   address?: string;
  //   type: EventType;
  //   programId: string;
  //   functionId: string;
  //   fee: number;
  //   inputs: (Record | string)[];
  // }
  const { requestCreateEvent, eventId } = useRequestCreateEvent({
    type: EventType.Execute,
    programId: 'cflip_testing_123.aleo',
    functionId: 'propose_game',
    fee: 1,
    inputs: Object.values(proposeGameInputs)
  });

  useEffect(() => {
    /// validate proposeGameInputs are valid here
    ///   call requestCreateEvent();
  }, [proposeGameInputs]);

  const execute = () => {
    createSharedState();
    /// seed may not be defined here
    const inputs = {
      ...proposeGameInputs,
      seed,
    };
    setProposeGameInputs(inputs);
    /// proposeGameInputs might not be defined here
    requestCreateEvent();
  };
  const step = proposeGameInputs.step ?? '1_NewGame' as Step;

  return (
    <div className="flex flex-col h-full w-full">
      {step === '1_NewGame' && <NewGamePage />}
      {/* {step === '2_HideAlex' && <HideAlex />}
      {step === '3_StartWager' && <StartWager />}
      {step === '4_ConfirmStartGame' && <ConfirmStartGame />}
      {step === '5_GameStarted' && <GameStarted />} */}
    </div>
  )
}

export default NewGame