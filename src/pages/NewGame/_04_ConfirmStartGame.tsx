/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import Wager from '../../components/Wager';
import SelectedTreasureLocation from '../../components/SelectedTreasureLocation';
import { useAtom } from 'jotai';
import {
  eventIdAtom,
  proposeGameInputsAtom,
  proposeGameStepAtom,
} from './index';
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
} from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { useState } from 'react';
import jsyaml from 'js-yaml';
import { Answer } from '../../state/game_states';
import { Banner } from '../../components/Banner';

const messageToSign = '1234567field';

enum ConfirmStep {
  Signing,
  RequestingEvent,
}

function ConfirmStartGame() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);
  const [confirmStep, setConfirmStep] = useState(ConfirmStep.Signing);

  const opponent = inputs.opponent ?? '';
  const answer = inputs.player_one_answer_readable;
  const amount = inputs.wager_amount ?? 0;

  const { account } = useAccount();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const [_eventId, setEventId] = useAtom(eventIdAtom);

  const createProposeGameEvent = async () => {
    setLoading(true);
    setConfirmStep(ConfirmStep.Signing);
    const sharedStateResponse = await createSharedState();
    if (sharedStateResponse.error) {
      setError(sharedStateResponse.error);
    } else if (sharedStateResponse.data) {
      const seed = sharedStateResponse.data.seed;
      const address = sharedStateResponse.data.address;

      const signature = await requestSignature({ message: messageToSign });

      setInputs({ ...inputs, seed, game_multisig: address });
      if (
        inputs.opponent &&
        inputs.wager_record &&
        inputs.wager_amount &&
        inputs.player_one_answer &&
        signature &&
        signature.messageFields &&
        signature.signature
      ) {
        setConfirmStep(ConfirmStep.RequestingEvent);

        const fields = Object(jsyaml.load(signature.messageFields));

        const proposalInputs: Omit<
          ProposeGameInputs,
          'player_one_answer_readable'
        > = {
          wager_record: inputs.wager_record,
          wager_amount: inputs.wager_amount + 'u64',
          sender_address: account.address,
          challenger: account.address,
          opponent: inputs.opponent,
          game_multisig: address,
          message_1: fields.field_1,
          message_2: fields.field_2,
          message_3: fields.field_3,
          message_4: fields.field_4,
          message_5: fields.field_5,
          signature: signature.signature,
          nonce: messageToSign, /// todo - make this random
          player_one_answer: inputs.player_one_answer,
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
        } else {
          console.log('success', createEventResponse.eventId);
          setEventId(createEventResponse.eventId);
          setStep('5_GameStarted');
        }
      }
    }
    setLoading(false);
    setConfirmStep(ConfirmStep.Signing);
  };

  const disabled = [
    inputs.opponent,
    inputs.wager_record,
    inputs.wager_amount,
    inputs.player_one_answer_readable,
  ].includes(undefined);

  return (
    <div className='flex h-full w-full flex-col items-center justify-between px-5'>
      <Banner
        title={
          <>
            Review
            <br />
            game
          </>
        }
        body={
          <div className='flex flex-col justify-center gap-4'>
            <Opponent opponent={opponent} />
            <Wager wagerAmount={Number(amount)} />
            {answer && (
              <div className='flex flex-col gap-2'>
                <SelectedTreasureLocation
                  answer={answer as Answer}
                  win={undefined}
                />
                <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary'>
                  You chose to hide the Treasure {answer}!
                </div>
              </div>
            )}
            {!loading ? (
              ''
            ) : confirmStep === ConfirmStep.Signing ? (
              <p className='text-2xl'>SIGN MESSAGE</p>
            ) : (
              <p className='text-2xl'>CREATE EVENT</p>
            )}
          </div>
        }
        step={3}
        totalSteps={5}
        onClickLeft={() => setStep('3_StartWager')}
        onClickRight={createProposeGameEvent}
        rightDisabled={disabled || loading}
      />
    </div>
  );
}

export default ConfirmStartGame;
