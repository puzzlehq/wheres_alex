/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom, proposeGameStepAtom } from "./index"
import { GAME_FUNCTIONS, GAME_PROGRAM_ID, ProposeGameInputs, stepFees } from '../../state/manager';
import { createSharedState, requestCreateEvent } from '@puzzlehq/sdk';
import { EventType } from '@puzzlehq/types';
import { useState } from 'react';

function ConfirmStartGame() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);

  const opponent = inputs.opponent ?? '';
  const answer = inputs.answer;
  const game_address = inputs.game_address;
  const wagerAmount = inputs.wagerAmount ?? 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const createProposeGameEvent = async () => {
    setLoading(true);
    const sharedStateResponse = await createSharedState();
    if (sharedStateResponse.error) {
      setError(sharedStateResponse.error);
    } else {

      setInputs({ ms_seed: sharedStateResponse.seed, game_address: sharedStateResponse.address });
      if (inputs.opponent && inputs.wagerRecord && inputs.wagerAmount && inputs.answer) {
        const proposalInputs: ProposeGameInputs = {
          ms_seed: sharedStateResponse.seed,
          game_address: sharedStateResponse.address,
          opponent: inputs.opponent,
          wagerRecord: inputs.wagerRecord,
          wagerAmount: inputs.wagerAmount,
          answer: inputs.answer,
          nonce: '1' /// todo - make this random
        };
        const createEventResponse = await requestCreateEvent({
          type: EventType.Execute,
          programId: GAME_PROGRAM_ID,
          functionId: GAME_FUNCTIONS.propose_game,
          fee: stepFees.propose_game,
          inputs: proposalInputs
        });
        if (createEventResponse.error) {
          setError(createEventResponse.error);
        } else {
          console.log('success', createEventResponse.eventId);
          // setEventId(createEventResponse.eventId);
          setStep('5_GameStarted');
        }
        setLoading(false);
      }
    }
  };

  const disabled = !answer || !game_address;
  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wagerAmount} />
      {answer &&
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      }
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col gap-4'>
        <Button
          onClick={createProposeGameEvent}
          color='green'  
          disabled={disabled || loading}
        >
          PROPOSE GAME
        </Button>
        <Button
          onClick={() => setStep('5_GameStarted')}
          color='gray'
        >
          BACK
        </Button>
      </div>
    </main>
  );
}

export default ConfirmStartGame;
