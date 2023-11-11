/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { acceptGameInputsAtom } from './index';
import { useAtom } from 'jotai';

function Confirmed() { 
  const navigate = useNavigate();
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);

  const game_address = acceptGameInputs.game_address;
  const eventId = acceptGameInputs.eventIdAccept;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        {game_address && eventId && <GameInfo multisig={game_address} eventID={eventId} newGame={false} />}
        <div className='flex flex-col flex-grow'/>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => {
              navigate('/new-game')
              setAcceptGameInputs({step: '1_AcceptGame'})
            }}
            color='yellow'
          >
            START ANOTHER GAME
          </Button>
          <Button
            onClick={() => {
              navigate('/')
              setAcceptGameInputs({step: '1_AcceptGame'})
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

export default Confirmed;
