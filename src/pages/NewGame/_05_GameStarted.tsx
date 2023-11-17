/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { eventIdAtom, proposeGameInputsAtom } from './index';

function GameStarted(props: { done: () => void }) {
  const [inputs] = useAtom(proposeGameInputsAtom);

  const game_multisig = inputs.game_multisig;
  const [eventId] = useAtom(eventIdAtom);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex w-full h-full flex-col items-center px-5'>
        {game_multisig && eventId && <GameInfo multisig={game_multisig} eventId={eventId} newGame={true} />}
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

export default GameStarted;
