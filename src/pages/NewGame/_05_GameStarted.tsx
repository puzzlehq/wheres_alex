/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useNewGameStore } from './store';

function GameStarted() { 
  const navigate = useNavigate();
  const [multisig, eventId, close] = useNewGameStore((state) => [state.multisig, state.eventId, state.close]);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        {multisig && eventId && <GameInfo multisig={multisig} eventID={eventId} />}
        <div className='flex flex-col flex-grow'/>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => {
              navigate('/')
              close()
            }}
            color='pink'
          >
            NOTIFY OTHER PLAYER
          </Button>
          <Button
            onClick={() => {
              navigate('/new-game')
              close()
            }}
            color='yellow'
          >
            START ANOTHER GAME
          </Button>
          <Button
          onClick={() => navigate('/')}
          color='transparent'
        >
          TAKE ME BACK HOME
        </Button>
        </div>
      </div>
    </main>
  );
}

export default GameStarted;
