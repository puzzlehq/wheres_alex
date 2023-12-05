import { useNavigate } from 'react-router-dom';
import Versus from '@components/Versus.js';
import PageHeader from '@components/PageHeader.js';
import Wager from '@components/Wager.js';
import Button from '@components/Button.js';
import { useRenegeStore } from './store';

const RenegeGame = () => {
  const navigate = useNavigate();

  const [opponent, wager, renege, close] = useRenegeStore((state) => [
    state.opponent,
    state.wager,
    state.renege,
    state.close,
  ]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-red' text='Renege CHALLENGE' />
      <Versus versus={opponent ?? ''} />
      <Wager wagerAmount={wager ?? -1} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <Button
          color='red'
          onClick={async () => {
            await renege();
            navigate('/');
            close();
          }}
        >
          RENEGE
        </Button>
        <Button
          color='gray'
          onClick={() => {
            navigate('/');
            close();
          }}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default RenegeGame;
