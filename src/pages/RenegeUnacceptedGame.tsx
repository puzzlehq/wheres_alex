import { useNavigate } from 'react-router-dom';
import Opponent from '../components/Opponent';
import PageHeader from '../components/PageHeader';
import Wager from '../components/Wager';

type RenegeGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
};

const RenegeGame = ({ challenger, wager }: RenegeGameProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-red' text='Renege CHALLENGE' />
      <Opponent opponent={challenger ?? 'alice'}/>
      <Wager wagerAmount={wager ?? '0'} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <button
          className={`w-full self-center whitespace-nowrap rounded-[200px] bg-red p-5 text-center
                      text-3xl font-extrabold tracking-tight text-black max-md:ml-px`}
        >
          Renege
        </button>
        <button
          className={`w-full self-center whitespace-nowrap rounded-[200px] bg-gray p-5 text-center
                      text-3xl font-extrabold tracking-tight text-black max-md:ml-px`}
          onClick={() => navigate('/')}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default RenegeGame;
