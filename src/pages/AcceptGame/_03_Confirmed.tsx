/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useAcceptGameStore } from './store';

function Confirmed(props: { done: () => void }) {
  const [inputs] = useAcceptGameStore((state) => [state.inputsAcceptGame]);

  const game_address = inputs?.game_multisig;
  const eventId = inputs?.eventIdAccept;

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        {game_address && eventId && (
          <GameInfo multisig={game_address} eventId={eventId} newGame={false} />
        )}
        <div className='flex flex-grow flex-col' />
        <div className='flex flex-col gap-4'>
          <Button onClick={props.done} color='transparent'>
            GO HOME
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirmed;
