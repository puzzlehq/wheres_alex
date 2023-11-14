/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { acceptGameInputsAtom } from './index';
import { useAtom } from 'jotai';

function Confirmed(props: { done: () => void }) { 
  const [inputs] = useAtom(acceptGameInputsAtom);

  const game_address = inputs.game_address;
  const eventId = inputs.eventIdAccept;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        {game_address && eventId && <GameInfo multisig={game_address} eventId={eventId} newGame={false} />}
        <div className='flex flex-col flex-grow'/>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={props.done}
            color='transparent'
          >
            GO HOME
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Confirmed;
