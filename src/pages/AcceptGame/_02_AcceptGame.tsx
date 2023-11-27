/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '../../components/PageHeader';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import Button from '../../components/Button';
import { requestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { useState } from 'react';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx';
import { Step, useAcceptGameStore } from './store';

function AcceptGame() {
  const [inputs, setInputs, setStep] = useAcceptGameStore((state) => [state.inputsAcceptGame, state.setAcceptGameInputs, state.setStep]);

  const answer = inputs?.player_two_answer_readable;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const createEvent = async () => {
    if (!inputs) return;
    setLoading(true);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.accept_game,
      fee: stepFees.accept_game,
      inputs: Object.values(inputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setStep(Step._03_Confirmed);
    }
    setLoading(false);
  };

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center gap-6 px-5'>
        <div className='flex w-full flex-col gap-2'>
          <Nav step={2} isChallenger={false} />
          <PageHeader bg='bg-primary-blue' text='FIND ALEX' />
        </div>
        <ChooseAlexLocation
          setAnswer={(answer) => {
            const newAnswer =
              answer === Answer.InTheWeeds ? '0field' : '1field';
              setInputs({
              ...inputs,
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
    </div>
  );
}

export default AcceptGame;
