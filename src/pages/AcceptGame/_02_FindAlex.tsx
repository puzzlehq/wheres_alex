/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '../../components/PageHeader';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import Button from '../../components/Button';
import { acceptGameInputsAtom, acceptGameStepAtom } from './index';
import { useAtom } from 'jotai';
import { requestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { useState } from 'react';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx';

function FindAlex() {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const [_, setStep] = useAtom(acceptGameStepAtom);

  const answer = acceptGameInputs.player_two_answer_readable;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const createEvent = async () => {
    setLoading(true);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.accept_game,
      fee: stepFees.accept_game,
      inputs: Object.values(acceptGameInputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setStep('3_Confirmed');
    }
    setLoading(false);
  };

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center gap-6 px-5'>
        <div className='flex w-full flex-col gap-2'>
          <Nav step={2} />
          <PageHeader bg='bg-primary-blue' text='FIND ALEX' />
        </div>
        <ChooseAlexLocation
          setAnswer={(answer) => {
            const newAnswer =
              answer === Answer.InTheWeeds ? '0field' : '1field';
            setAcceptGameInputs({
              ...acceptGameInputs,
              player_two_answer: newAnswer,
              player_two_answer_readable: answer,
            });
          }}
          answer={answer}
          hiding={false}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          onClick={createEvent}
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
