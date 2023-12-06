import { useNavigate } from 'react-router-dom';
import Wager from '@components/Wager.js';
import PageHeader from '@components/PageHeader.js';
import { getNumberAmount } from '../../../utils.js';
import Button from '@components/Button.js';
import { useGameStore } from '@state/gameStore.js';

const GameOver = () => {
  const [currentGame] = useGameStore((state) => [state.currentGame]);
  const navigate = useNavigate();

  const wager = (currentGame?.gameNotification.recordData.total_pot ?? 0) / 2;

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-blue' text='CONGRATS WINNER!' />
      <div className='flex flex-col items-center gap-2'>
        <Wager wagerAmount={getNumberAmount(wager)} winnings />
        <a
          className={`font-extrabold text-primary-green hover:text-primary-green hover:underline`}
          href='/'
        >
          Payout Confirmation
        </a>
      </div>
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-2'>
        <Button color='gray' onClick={() => navigate('/new-game')}>
          START ANOTHER GAME
        </Button>
        <Button
          color='transparent'
          className=' text-primary-gray'
          onClick={() => navigate('/')}
        >
          TAKE ME BACK HOME
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
