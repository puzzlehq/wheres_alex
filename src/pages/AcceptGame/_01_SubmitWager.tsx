import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  EventStatus,
  EventType,
  importSharedState,
  requestCreateEvent,
  requestSignature,
} from '@puzzlehq/sdk';
import {
  GAME_FUNCTIONS,
  GAME_PROGRAM_ID,
  SubmitWagerInputs,
  stepFees,
} from '../../state/manager';
import { Step, useAcceptGameStore } from './store';
import { useGameStore } from '../../state/store';
import jsyaml from 'js-yaml';
import Nav from '../../components/Nav';
import { useEventQuery } from '../../state/hooks/event';

const messageToSign = '1234567field';

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
  const navigate = useNavigate();

  const { data } = useEventQuery(eventIdSubmit);
  const event = data?.event;
  const eventError = data?.error;
  const eventStatus = event?.status;

  useEffect(() => {
    if (eventStatus === EventStatus.Settled) {
      setStep(Step._02_AcceptGame);
    } else if (eventStatus === EventStatus.Failed) {
      setLoading(false);
      setError(event?.error);
    }
  }, [eventStatus]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createEvent = async () => {
    if (
      !inputs?.opponent_wager_record ||
      !inputs.key_record ||
      !inputs.game_req_notification
    )
      return;
    setLoading(true);
    const signature = await requestSignature({ message: messageToSign });

    if (!signature.messageFields || !signature.signature) {
      setError('Signature or signature message fields not found');
      return;
    }
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
      fee: stepFees.submit_wager,
      inputs: Object.values(newInputs),
    });
    if (response.error) {
      setError(response.error);
    } else if (response.eventId) {
      /// todo - other things here?
      setEventIdSubmit(response.eventId);
      setSubmitWagerInputs({ ...newInputs });
    }
    setLoading(false);
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

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <div className='flex w-full flex-col gap-2'>
        <Nav step={1} isChallenger={false} />
        <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      </div>
      {opponent && <Opponent opponent={opponent} />}
      <Wager wagerAmount={Number(wagerAmount)} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        {error && <p>Error: {error}</p>}
        {eventError && <p>Event Error: {eventError}</p>}
        <Button
          color='green'
          disabled={disabled || loading || eventLoading}
          onClick={createEvent}
        >
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
