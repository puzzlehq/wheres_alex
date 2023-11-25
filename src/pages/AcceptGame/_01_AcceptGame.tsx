import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { usePieces } from '../../state/usePieces';
import { useEffect, useState } from 'react';
import { requestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, stepFees } from '../../state/manager';
import { Step, useAcceptGameStore } from './store';

const AcceptGame = () => {
  const [inputs, setInputs, setStep] = useAcceptGameStore((state) => [state.inputs, state.setInputs, state.setStep]);
  const { largestPiece } = usePieces();
  const navigate = useNavigate();

  const opponent = inputs?.opponent;
  const wagerAmount = inputs?.wagerAmount;
  const wagerRecord = largestPiece;

  const disabled = !opponent || !wagerAmount || !wagerRecord || !inputs;

  useEffect(() => {
    setInputs({
      ...inputs,
      wagerRecord: wagerRecord?.plaintext.toString().replace(/\s+/g, ''),
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const createEvent = async () => {
    if (!inputs) return;
    setLoading(true);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.set_wager,
      fee: stepFees.set_wager,
      inputs: Object.values(inputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setStep(Step._02_FindAlex);
    }
    setLoading(false);
  };

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      {opponent && <Opponent opponent={opponent} />}
      <Wager wagerAmount={Number(wagerAmount)} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <Button color='green' disabled={loading || disabled} onClick={createEvent}>
          ACCEPT WAGER
        </Button>
        <Button
          color='gray'
          onClick={() => {
            /// todo - way more here
            navigate('/');
          }}
        >
          REJECT
        </Button>
      </div>
    </div>
  );
};

export default AcceptGame;
