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
} from '@puzzlehq/sdk';
import { useState } from 'react';
import jsyaml from 'js-yaml';
import { Answer } from '../../state/RecordTypes/wheres_alex_vxxx.js';
import { Step, useNewGameStore } from './store.js';

const messageToSign = '1234567field';

enum ConfirmStep {
  Signing,
  RequestingEvent,
}

function ConfirmStartGame() {
  const [inputs, setInputs, setStep, setEventId] = useNewGameStore((state) => [
    state.inputs,
    state.setInputs,
    state.setStep,
    state.setEventId,
  ]);
  const [confirmStep, setConfirmStep] = useState(ConfirmStep.Signing);

  const opponent = inputs?.opponent ?? '';
  const answer = inputs?.answer;
  const amount = inputs?.wagerAmount ?? 0;

  const { account } = useAccount();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createProposeGameEvent = async () => {
    setLoading(true);
    setConfirmStep(ConfirmStep.Signing);
    const sharedStateResponse = await createSharedState();
    if (sharedStateResponse.error) {
      setError(sharedStateResponse.error);
    } else if (sharedStateResponse.data) {
      const seed = sharedStateResponse.data.seed;
      const game_multisig = sharedStateResponse.data.address;

      const signature = await requestSignature({ message: messageToSign });

      setInputs({ ...inputs, seed, game_multisig });
      if (
        inputs?.opponent &&
        inputs?.wagerRecord &&
        inputs?.wagerAmount &&
        inputs?.answer &&
        signature &&
        signature.messageFields &&
        signature.signature &&
        account
      ) {
        setConfirmStep(ConfirmStep.RequestingEvent);

        const fields = Object(jsyaml.load(signature.messageFields));

        const proposalInputs: ProposeGameInputs = {
          wagerRecord: inputs.wagerRecord,
          wagerAmount: inputs.wagerAmount + 'u64',
          sender_address: account.address,
          challenger: account.address,
          opponent: inputs.opponent,
          game_multisig: game_multisig,
          message_1: fields.field_1,
          message_2: fields.field_2,
          message_3: fields.field_3,
          message_4: fields.field_4,
          message_5: fields.field_5,
          signature: signature.signature,
          nonce: messageToSign, /// todo - make this random
          answer: inputs.answer === Answer.InTheWeeds ? '0field' : '1field',
          seed,
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
          setStep(Step._05_GameStarted);
        }
      }
    }
    setLoading(false);
    setConfirmStep(ConfirmStep.Signing);
  };

  const disabled = [
    inputs?.opponent,
    inputs?.wagerRecord,
    inputs?.wagerAmount,
    inputs?.answer,
  ].includes(undefined);

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
      <div className='flex flex-col gap-4'>
        <Button
          onClick={createProposeGameEvent}
          color='green'
          disabled={disabled || loading}
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
