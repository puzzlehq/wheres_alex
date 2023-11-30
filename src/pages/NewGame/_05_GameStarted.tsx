/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useNewGameStore } from './store';

function GameStarted(props: { done: () => void }) {
  const [inputs, eventId] = useNewGameStore((state) => [
    state.inputs,
    state.eventId,
  ]);
  const game_multisig = inputs?.game_multisig;

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        {game_multisig && eventId && (
          <GameInfo multisig={game_multisig} eventId={eventId} newGame={true} />
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

export default GameStarted;
