/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom } from './index';
// import { useNewGameStore } from './store';

function GameStarted() { 
  const navigate = useNavigate();
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  const game_address = proposeGameInputs.game_address;
  const eventId = proposeGameInputs.eventId;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        {game_address && eventId && <GameInfo multisig={game_address} eventID={eventId} />}
        <div className='flex flex-col flex-grow'/>
        <div className='flex flex-col gap-4'>
          {/* <Button
            onClick={() => {
              navigate('/')
              setProposeGameInputs({step: '1_NewGame'})
            }}
            color='pink'
          >
            NOTIFY OTHER PLAYER
          </Button> */}
          <Button
            onClick={() => {
              navigate('/new-game')
              setProposeGameInputs({step: '1_NewGame'})
            }}
            color='yellow'
          >
            START ANOTHER GAME
          </Button>
          <Button
            onClick={() => {
              navigate('/')
              setProposeGameInputs({step: '1_NewGame'})

            }}
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
