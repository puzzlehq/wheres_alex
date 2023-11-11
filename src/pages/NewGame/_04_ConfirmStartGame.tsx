/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom } from "./index"
import { GAME_FUNCTIONS, GAME_PROGRAM_ID } from '../../state/manager';
import { useRequestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { useEffect } from 'react';

function ConfirmStartGame() {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  const { requestCreateEvent, eventId, error, loading } = useRequestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.propose_game,
      fee: 10000,
      inputs: ["1"],
  })

  useEffect(() => {
    if (eventId) {
      setProposeGameInputs({...proposeGameInputs, eventId})
    }
  }, [eventId])

  const opponent = proposeGameInputs.opponent ?? '';
  const wagerAmount = proposeGameInputs.wagerAmount ?? 0;
  const answer = proposeGameInputs.answer;
  const game_address = proposeGameInputs.game_address;

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
          onClick={requestCreateEvent}
          color='green'  
          disabled={disabled || loading}
        >
          KICKOFF GAME!
        </Button>
        <Button
          onClick={() => setProposeGameInputs({ ...proposeGameInputs, step: '3_StartWager' })}
          color='gray'
        >
          BACK
        </Button>
      </div>
    </main>
  );
}

export default ConfirmStartGame;
