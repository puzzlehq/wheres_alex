import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import TotalWinnings from '@components/TotalWinnings';
import TheirTurn from '@components/TheirTurn';
import YourTurn from '@components/YourTurn';
import { useGameStore } from '@state/gameStore';
import { useNewGameStore } from './NewGame/store';
import { useAccount } from '@puzzlehq/sdk';

function Home() {
  const [yourTurn, theirTurn, totalBalance] = useGameStore((state) => [
    state.yourTurn,
    state.theirTurn,
    state.totalBalance,
  ]);
  const [initialize] = useNewGameStore((state) => [state.initialize]);
  const { account } = useAccount();
  const navigate = useNavigate();

  return (
    <div className='flex h-full flex-col justify-between '>
      <div className='flex w-full flex-col gap-4 px-1'>
        <TotalWinnings amount={totalBalance} />
        <Button
          color='yellow'
          onClick={() => {
            if (!account) return;
            initialize(account?.address);
            navigate('/new-game');
          }}
          disabled={!account}
        >
          NEW GAME
        </Button>
        {yourTurn.length > 0 && <YourTurn games={yourTurn} />}
        {theirTurn.length > 0 && <TheirTurn games={theirTurn} />}
        {yourTurn.length === 0 && theirTurn.length === 0 && (
          <p className='self-center font-semibold'>
            No ongoing games, start one with a friend!
          </p>
        )}
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
