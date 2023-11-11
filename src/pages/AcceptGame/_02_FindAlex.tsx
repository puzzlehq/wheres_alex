/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '../../components/PageHeader';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import Button from '../../components/Button';
import { acceptGameInputsAtom } from './index';
import { useAtom } from 'jotai';
import { Answer } from '../../state/game_states';
import { useRequestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { useEffect } from 'react';

function FindAlex() {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);

  const answer = acceptGameInputs.player_two_answer_readable;

  const { requestCreateEvent, eventId, error, loading } = useRequestCreateEvent({
    type: EventType.Execute,
    programId: GAME_PROGRAM_ID,
    functionId: GAME_FUNCTIONS.accept_game,
    fee: stepFees.accept_game,
    inputs: ["1"],
  })

  useEffect(() => {
    if (eventId) { 
      setAcceptGameInputs({...acceptGameInputs, step: '3_Confirmed'})
    }
  }, [eventId])

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5 gap-6'>
        <div className='w-full flex flex-col gap-2'>
          <Nav step={2} />
          <PageHeader bg='bg-primary-blue' text='FIND ALEX' />
        </div>
        <ChooseAlexLocation
          setAnswer={(answer) => {
            const newAnswer = answer === Answer.InTheWeeds ? '0field' : '1field' 
            setAcceptGameInputs({ ...acceptGameInputs, player_two_answer: newAnswer, player_two_answer_readable: answer })
          }}
          answer={answer}
          hiding={false}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          onClick={async () => {
            requestCreateEvent()
          }}
          disabled={!answer || loading}
          color='green'
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default FindAlex;
