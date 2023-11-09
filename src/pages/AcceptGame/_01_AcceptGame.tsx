import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import Button from '../../components/Button';
import { useAcceptGameStore } from './store';
import { useNavigate } from 'react-router-dom';

const AcceptGame = () => {
  const [wager, opponent, rejectGame, acceptGame] = useAcceptGameStore((state) => [state.wager, state.opponent, state.rejectGame, state.acceptGame ])
  const navigate = useNavigate();

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wager} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <Button
          color='green'
          onClick={() => {
            acceptGame();
          }}
        >
          ACCEPT WAGER
        </Button>
        <Button
          color='gray'
          onClick={() => {
            rejectGame();
            navigate('/')
          }}
        >
          REJECT
        </Button>
      </div>
    </main>
  );
};

export default AcceptGame;
