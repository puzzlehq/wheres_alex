/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom } from "./index"
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { useCreateSharedState, useRequestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { useEffect, useMemo } from 'react';
import { PrivateKey } from '@puzzlehq/aleo-wasm-web';

const enc = new TextEncoder();

function ConfirmStartGame() {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  const opponent = proposeGameInputs.opponent ?? '';
  const answer = proposeGameInputs.answer;
  const game_address = proposeGameInputs.game_address;
  // const challenger = proposeGameInputs.challenger;
  const wagerAmount = proposeGameInputs.wagerAmount ?? 0;
  const wagerRecord = proposeGameInputs.wagerRecord;

  const { createSharedState, seed, loading: loading_seed } = useCreateSharedState();
  useEffect(() => {
    console.log('seed', seed);
    if (seed) {
      const seed_array = Uint8Array.from(enc.encode(seed.replace('field', '')).subarray(0,32));
      const multisig_pk = PrivateKey.from_seed_unchecked(seed_array);
      const game_address = multisig_pk.to_address().to_string();
      setProposeGameInputs({ ms_seed: seed, game_address });
    }
  }, [seed]);

  const programInputs = useMemo(() => {
    const inputs = proposeGameInputs;
    if (inputs.ms_seed && inputs.game_address && inputs.opponent && inputs.wagerRecord && inputs.wagerAmount && inputs.answer) {
      return [
        inputs.ms_seed,
        inputs.game_address,
        inputs.opponent,
        inputs.wagerRecord,
        inputs.wagerAmount.toString()
      ]
    } else {
      return null;
    }
  }, [proposeGameInputs]);

  const { requestCreateEvent, eventId, error, loading: loading_event } = useRequestCreateEvent({
    type: EventType.Execute,
    programId: GAME_PROGRAM_ID,
    functionId: GAME_FUNCTIONS.propose_game,
    fee: stepFees.propose_game,
    inputs: programInputs ?? []
  });
  useEffect(() => {
    if (programInputs) {
      requestCreateEvent();
    }
  }, [programInputs]);

  useEffect(() => {
    if (eventId) {
      setProposeGameInputs({...proposeGameInputs, eventId, step: '5_GameStarted'})
    }
  }, [eventId])

  const disabled = !answer || !game_address;
  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wagerAmount} />
      {answer &&
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      }
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col gap-4'>
        <Button
          onClick={createSharedState}
          color='green'  
          disabled={disabled || loading_seed || loading_event}
        >
          KICKOFF GAME!
        </Button>
        <Button
          onClick={() => setProposeGameInputs({step: '5_GameStarted'})}
          color='gray'
        >
          BACK
        </Button>
      </div>
    </main>
  );
}

export default ConfirmStartGame;
