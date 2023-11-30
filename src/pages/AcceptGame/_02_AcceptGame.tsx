/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '../../components/PageHeader';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import Button from '../../components/Button';
import { requestCreateEvent, EventType } from '@puzzlehq/sdk';
import { AcceptGameInputs, GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { useState } from 'react';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx';
import { Step, useAcceptGameStore } from './store';

function AcceptGame() {
  const [inputs, setInputs, setEventIdAccept, setStep] = useAcceptGameStore((state) => [
    state.inputsAcceptGame,
    state.setAcceptGameInputs,
    state.setEventIdAccept,
    state.setStep,
  ]);

  const answer = inputs?.opponent_answer_readable;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createEvent = async () => {
    if (
      !inputs?.game_record ||
      !inputs?.opponent_answer ||
      !inputs.piece_stake_challenger ||
      !inputs.piece_claim_challenger ||
      !inputs.piece_stake_opponent || 
      !inputs.piece_claim_opponent
    ) return;
    setLoading(true);
    const acceptGameInputs: Omit<AcceptGameInputs, 'opponent_answer_readable'> = {
      game_record: inputs.game_record,
      opponent_answer: inputs.opponent_answer,
      piece_stake_challenger: inputs.piece_stake_challenger,
      piece_claim_challenger: inputs.piece_claim_challenger,
      piece_stake_opponent: inputs.piece_stake_opponent,
      piece_claim_opponent: inputs.piece_claim_opponent,
      block_ht: '700000u32',
    };
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.accept_game,
      fee: stepFees.accept_game,
      inputs: Object.values(acceptGameInputs),
      address: inputs.game_record.owner
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setEventIdAccept(response.eventId);
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
              opponent_answer: newAnswer,
              opponent_answer_readable: answer,
            });
          }}
          answer={answer}
          hiding={false}
        />
        <div className='flex flex-grow flex-col' />
        {error && <p>error</p>}
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
