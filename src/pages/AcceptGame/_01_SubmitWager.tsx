import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Versus from '../../components/Versus';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  EventStatus,
  EventType,
  importSharedState,
  requestCreateEvent,
  requestSignature,
  useEvent,
} from '@puzzlehq/sdk';
import {
  GAME_FUNCTIONS,
  GAME_PROGRAM_ID,
  SubmitWagerInputs,
  transitionFees,
} from '../../state/manager';
import { Step, useAcceptGameStore } from './store';
import { useGameStore } from '../../state/store';
import jsyaml from 'js-yaml';
import Nav from '../../components/Nav';

const messageToSign = '1234567field';

enum ConfirmStep {
  Signing,
  RequestingEvent,
}

const SubmitWager = () => {
  const [
    inputs,
    eventIdSubmit,
    setSubmitWagerInputs,
    setEventIdSubmit,
    setStep,
  ] = useAcceptGameStore((state) => [
    state.inputsSubmitWager,
    state.eventIdSubmit,
    state.setSubmitWagerInputs,
    state.setEventIdSubmit,
    state.setStep,
  ]);
  const [currentGame, largestPiece] = useGameStore((state) => [
    state.currentGame,
    state.largestPiece,
  ]);
  const [confirmStep, setConfirmStep] = useState(ConfirmStep.Signing);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { event, error: _error } = useEvent({ id: eventIdSubmit });
  const eventStatus = event?.status;

  useEffect(() => {
    event && console.log('Submit Wager: event', event);
  }, [event])

  useEffect(() => {
    const eventError = _error;
    eventError && setError(eventError);
  }, [_error]);

  useEffect(() => {
    if (eventStatus === EventStatus.Settled) {
      setStep(Step._02_AcceptGame);
      setLoading(false);
      setError(undefined);
    } else if (eventStatus === EventStatus.Failed) {
      setLoading(false);
      setError(event?.error);
    }
  }, [eventStatus]);

  const createEvent = async () => {
    if (
      !inputs?.opponent_wager_record ||
      !inputs.key_record ||
      !inputs.game_req_notification
    )
      return;
    setLoading(true);
    setError(undefined);
    const signature = await requestSignature({ message: messageToSign });
    setConfirmStep(ConfirmStep.Signing);
    if (!signature.messageFields || !signature.signature) {
      setError('Signature or signature message fields not found');
      return;
    }
    setConfirmStep(ConfirmStep.RequestingEvent);
    const messageFields = Object(jsyaml.load(signature.messageFields));

    const newInputs: Partial<SubmitWagerInputs> = {
      opponent_wager_record: inputs.opponent_wager_record,
      key_record: inputs.key_record,
      game_req_notification: inputs.game_req_notification,
      opponent_message_1: messageFields.field_1,
      opponent_message_2: messageFields.field_2,
      opponent_message_3: messageFields.field_3,
      opponent_message_4: messageFields.field_4,
      opponent_message_5: messageFields.field_5,
      opponent_sig: signature.signature,
    };
    const game_multisig_seed = currentGame?.utilRecords?.[0].data.seed ?? '';
    console.log('game_multisig seed', game_multisig_seed);
    const { data } = await importSharedState(game_multisig_seed);
    console.log(`Shared state imported: ${data?.address}`);

    setSubmitWagerInputs(newInputs);
    const response = await requestCreateEvent({
      type: EventType.Execute,
      programId: GAME_PROGRAM_ID,
      functionId: GAME_FUNCTIONS.submit_wager,
      fee: transitionFees.submit_wager,
      inputs: Object.values(newInputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setEventIdSubmit(response.eventId);
      setSubmitWagerInputs({ ...newInputs });
    }
  };

  const opponent = currentGame?.gameNotification.recordData.challenger_address;
  const wagerAmount =
    currentGame?.gameNotification.recordData.total_pot ?? 0 / 2;
  const opponent_wager_record = largestPiece;

  const disabled =
    !opponent || !wagerAmount || !opponent_wager_record || !inputs;
  const eventLoading =
    eventStatus &&
    [EventStatus.Creating, EventStatus.Pending].includes(eventStatus);

  const [buttonText, setButtonText] = useState('CREATE EVENT');

  useEffect(() => {
    if (!loading) {
      setButtonText('CREATE EVENT');
    } else if (event?.status === EventStatus.Creating) {
      setButtonText('CREATING EVENT...');
    } else if (event?.status === EventStatus.Pending) {
      setButtonText('EVENT PENDING...');
    } else if (confirmStep === ConfirmStep.Signing) {
      setButtonText('REQUESTING SIGNATURE...');
    } else if (confirmStep === ConfirmStep.RequestingEvent) {
      setButtonText('REQUESTING EVENT...');
    }
  }, [loading, event?.status, confirmStep]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <div className='flex w-full flex-col gap-2'>
        <Nav step={1} isChallenger={false} />
        <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      </div>
      {opponent && <Versus versus={opponent} />}
      <Wager wagerAmount={Number(wagerAmount)} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        {error && <p>Error: {error}</p>}
        <Button
          color='green'
          disabled={disabled || loading || eventLoading}
          onClick={createEvent}
        >
          {buttonText}
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
