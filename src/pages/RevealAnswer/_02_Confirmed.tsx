/* eslint-disable @typescript-eslint/no-explicit-any */
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';
import { useFinishGameStore } from './store';
import { useEventQuery } from '../../hooks/event';
import { useGameStore } from '../../state/store';

function Confirmed() {
  const [eventId] = useFinishGameStore((state) => [state.eventId]);
  const [currentGame] = useGameStore((state) => [state.currentGame]);

  const game_address = currentGame?.gameNotification.recordData.game_multisig;
  const { data } = useEventQuery({ id: eventId });

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        {game_address && data && data.transactionId && (
          <GameInfo
            multisig={game_address}
            transactionId={data.transactionId}
            newGame={false}
          />
        )}
        <div className='flex flex-grow flex-col' />
        <div className='flex flex-col gap-4'>
          <Button color='transparent'>GO HOME</Button>
        </div>
      </div>
    </div>
  );
}

export default Confirmed;
