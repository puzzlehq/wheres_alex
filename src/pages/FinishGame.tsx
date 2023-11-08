import { useLocation } from 'react-router-dom';
import Wager from '../components/Wager';
import PageHeader from '../components/PageHeader';

const FinishGame = () => {
  const location = useLocation();
  const { wager } = location.state || {}; // Get the challenger and wager from state

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <PageHeader bg='bg-[#45B1ED]' text='CONGRATS WINNER!' />
      <Wager wagerAmount={wager ?? 5000} winnings />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-2'>
        <button className='w-full rounded-full bg-[#4EC331] p-3 text-4xl font-extrabold text-black'>
          ACCEPT WAGER
        </button>
        <button className='w-full rounded-full bg-[#868686] p-3 text-4xl font-extrabold text-black'>
          REJECT
        </button>
      </div>
    </div>
  );
};

export default FinishGame;
