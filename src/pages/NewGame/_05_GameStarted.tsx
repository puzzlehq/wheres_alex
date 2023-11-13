/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom } from './index';

function GameStarted(props: { done: () => void }) {
  const [inputs] = useAtom(proposeGameInputsAtom);

  const game_address = inputs.game_address;
  const eventId = inputs.eventId;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        {game_address && eventId && <GameInfo multisig={game_address} eventID={eventId} />}
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
