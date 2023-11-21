/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import {
  eventIdAtom,
  proposeGameInputsAtom,
  proposeGameStepAtom,
} from './index';
import { NakedBanner } from '../../components/Banner';
import { useNavigate } from 'react-router-dom';

function GameStarted() {
  const [inputs, setInput] = useAtom(proposeGameInputsAtom);
  const [step, setStep] = useAtom(proposeGameStepAtom);
  const navigate = useNavigate();

  const game_multisig = inputs.game_multisig;
  const [eventId] = useAtom(eventIdAtom);

  return (
    <div className='flex h-full w-full flex-col items-center justify-between px-5'>
      <NakedBanner
        title={
          <>
            Game
            <br />
            started
          </>
        }
        body={
          <>
            {game_multisig && eventId && (
              <GameInfo
                multisig={game_multisig}
                eventId={eventId}
                newGame={true}
              />
            )}
            <div className='flex flex-grow flex-col' />
            <div className='flex flex-col items-center'>
              <Button
                className='w-fit'
                onClick={() => {
                  setInput({});
                  setStep('1_NewGame');
                  navigate('/');
                }}
              >
                Go home
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}

export default GameStarted;
