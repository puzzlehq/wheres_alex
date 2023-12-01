/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import {
  GAME_FUNCTIONS,
  GAME_PROGRAM_ID,
  ProposeGameInputs,
  stepFees,
} from '../../state/manager';
import {
  createSharedState,
  requestCreateEvent,
  requestSignature,
  useAccount,
  EventType,
  EventStatus,
} from '@puzzlehq/sdk';
import { useEffect, useState } from 'react';
import jsyaml from 'js-yaml';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx.js';
import { Step, useNewGameStore } from './store.js';
import { useEventQuery } from '../../state/hooks/event.js';

const messageToSign = '1234567field';

enum ConfirmStep {
  Signing,
  RequestingEvent,
}

function ConfirmStartGame() {
  const [inputs, eventId, setInputs, setStep, setEventId] = useNewGameStore(
    (state) => [
      state.inputs,
      state.eventId,
      state.setInputs,
      state.setStep,
      state.setEventId,
    ]
  );
  const [confirmStep, setConfirmStep] = useState(ConfirmStep.Signing);

  const opponent = inputs?.opponent ?? '';
  const answer = inputs?.challenger_answer;
  const amount = inputs?.challenger_wager_amount ?? 0;

  const { account } = useAccount();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { data } = useEventQuery(eventId);
  const event = data?.event;
  const eventError = data?.error;
  const eventStatus = event?.status;

  const createProposeGameEvent = async () => {
    setLoading(true);
    setConfirmStep(ConfirmStep.Signing);
    const sharedStateResponse = await createSharedState();
    if (sharedStateResponse.error) {
      setError(sharedStateResponse.error);
    } else if (sharedStateResponse.data) {
      const game_multisig_seed = sharedStateResponse.data.seed;
      const game_multisig = sharedStateResponse.data.address;

      const signature = await requestSignature({ message: messageToSign });

      setInputs({ ...inputs, game_multisig_seed, game_multisig });
      if (
        inputs?.opponent &&
        inputs?.wager_record &&
        inputs?.challenger_wager_amount &&
        inputs?.challenger_answer &&
        inputs?.challenger &&
        signature &&
        signature.messageFields &&
        signature.signature &&
        account
      ) {
        setConfirmStep(ConfirmStep.RequestingEvent);

        const fields = Object(jsyaml.load(signature.messageFields));

        const proposalInputs: ProposeGameInputs = {
          wager_record: inputs.wager_record,
          challenger_wager_amount: inputs.challenger_wager_amount + 'u64',
          sender: inputs.challenger,
          challenger: inputs.challenger,
          opponent: inputs.opponent,
          game_multisig: game_multisig,
          challenger_message_1: fields.field_1,
          challenger_message_2: fields.field_2,
          challenger_message_3: fields.field_3,
          challenger_message_4: fields.field_4,
          challenger_message_5: fields.field_5,
          challenger_sig: signature.signature,
          challenger_nonce: messageToSign, /// todo - make this random
          challenger_answer:
            inputs.challenger_answer === Answer.InTheWeeds
              ? '0field'
              : '1field',
          game_multisig_seed,
        };
        const createEventResponse = await requestCreateEvent({
          type: EventType.Execute,
          programId: GAME_PROGRAM_ID,
          functionId: GAME_FUNCTIONS.propose_game,
          fee: stepFees.propose_game,
          inputs: Object.values(proposalInputs),
        });
        if (createEventResponse.error) {
          setError(createEventResponse.error);
        } else if (!createEventResponse.eventId) {
          setError('No eventId found!');
        } else {
          console.log('success', createEventResponse.eventId);
          setEventId(createEventResponse.eventId);
        }
      }
    }
    setLoading(false);
    setConfirmStep(ConfirmStep.Signing);
  };

  useEffect(() => {
    if (eventStatus === EventStatus.Settled) {
      setStep(Step._05_GameStarted);
    } else if (eventStatus === EventStatus.Failed) {
      setLoading(false);
      setError(event?.error);
    }
  }, [eventStatus]);

  const disabled = [
    inputs?.opponent,
    inputs?.wager_record,
    inputs?.challenger_wager_amount,
    inputs?.challenger_answer,
  ].includes(undefined);
  const eventLoading =
    event && [EventStatus.Creating, EventStatus.Pending].includes(event.status);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={Number(amount)} />
      {answer && (
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer as Answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      )}
      <div className='flex flex-grow flex-col' />
      {eventError && <p>Event Error: {eventError}</p>}
      {error && <p>Error: {eventError}</p>}
      <div className='flex flex-col gap-4'>
        <Button
          onClick={createProposeGameEvent}
          color='green'
          disabled={disabled || loading || eventLoading}
        >
          {!loading
            ? 'PROPOSE GAME'
            : confirmStep === ConfirmStep.Signing
            ? 'SIGN MESSAGE'
            : 'CREATE EVENT'}
        </Button>
        <Button onClick={() => setStep(Step._05_GameStarted)} color='gray'>
          BACK
        </Button>
      </div>
    </div>
  );
}

export default ConfirmStartGame;
