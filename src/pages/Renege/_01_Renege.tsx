import { useNavigate } from 'react-router-dom';
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import Button from '../../components/Button';

type RenegeGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
};

const RenegeGame = ({ challenger, wager }: RenegeGameProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-red' text='Renege CHALLENGE' />
      <Opponent opponent={challenger ?? 'alice'}/>
      <Wager wagerAmount={wager ?? '0'} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <Button
          color='red'  
        >
          Renege
        </Button>
        <Button
          color='gray'
          onClick={() => navigate('/')}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default RenegeGame;
