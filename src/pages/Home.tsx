/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TotalWinnings from '../components/TotalWinnings';
import TheirTurn from '../components/TheirTurn';
import YourTurn from '../components/YourTurn';
import { useGameStore } from '../state/store';

function Home() {
  const [yourTurn, theirTurn, totalBalance] = useGameStore((state) => [state.yourTurn, state.theirTurn, state.totalBalance]);
  const navigate = useNavigate();

  return (
    <div className='flex h-full flex-col justify-between '>
      <div className='flex w-full flex-col gap-4 px-1'>
        <TotalWinnings amount={totalBalance} />
        <Button color='yellow' onClick={() => navigate('/new-game')}>
          NEW GAME
        </Button>
        <YourTurn games={yourTurn} />
        <TheirTurn games={theirTurn} />
      </div>
      <div className='mt-4 px-4 pb-4 text-center'>
        {' '}
        {/* Adding px-4 back here to maintain padding for the bottom button */}
        <Button color='blue' size='sm'>
          Past Games
        </Button>
      </div>
    </div>
  );
}

export default Home;
