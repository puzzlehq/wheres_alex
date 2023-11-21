import { useNavigate } from 'react-router-dom';
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import Button from '../../components/Button';
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
      <Opponent opponent={opponent ?? ''} />
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
