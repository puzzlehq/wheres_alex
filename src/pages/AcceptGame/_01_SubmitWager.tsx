import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { importSharedState, requestCreateEvent, requestSignature, useRecords } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, SubmitWagerInputs, stepFees } from '../../state/manager';
import { Step, useAcceptGameStore } from './store';
import { useGameStore } from '../../state/store';
import jsyaml from 'js-yaml';


const messageToSign = '1234567field';

const SubmitWager = () => {
  const [inputs, setSubmitWagerInputs, setStep] = useAcceptGameStore((state) => [state.inputsSubmitWager, state.setSubmitWagerInputs, state.setStep]);
  const [currentGame, largestPiece] = useGameStore((state) => [state.currentGame, state.largestPiece]);
  const navigate = useNavigate();

  const ms_records = useRecords({address.})

  const opponent = currentGame?.gameRecord.recordData.challenger_address;
  const wagerAmount = currentGame?.gameRecord.recordData.total_pot ?? 0 / 2;
  const wagerRecord = largestPiece;

  const disabled = !opponent || !wagerAmount || !wagerRecord || !inputs;

  useEffect(() => {
    if (currentGame?.gameRecord.recordData.game_state === '2field') {
      setStep(Step._02_AcceptGame);
    }
  }, [currentGame])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createEvent = async () => {
    if (!inputs) return;
    setLoading(true);
    const signature = await requestSignature({ message: messageToSign });

    if (!signature.messageFields || !signature.signature) return;
    const messageFields = Object(jsyaml.load(signature.messageFields));

    const newInputs: Partial<SubmitWagerInputs> = {
      ...inputs,
      message_1: messageFields.field_1,
      message_2: messageFields.field_2,
      message_3: messageFields.field_3,
      message_4: messageFields.field_4,
      message_5: messageFields.field_5,
      sig: signature.signature
    }

    await importSharedState(currentGame?.gameRecord.recordData.)

    setSubmitWagerInputs(newInputs);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.submit_wager,
      fee: stepFees.submit_wager,
      inputs: Object.values(newInputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setStep(Step._02_AcceptGame);
      setSubmitWagerInputs({ ...newInputs });
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

export default SubmitWager;
