import PageHeader from '../../../components/PageHeader';
import SelectedAlexLocation from '../../../components/SelectedAlexLocation';
import Wager from '../../../components/Wager';
import Button from '../../../components/Button';
import { useClaimPrizeLoseStore } from './store';
import { useNavigate } from 'react-router-dom';

const Lose = () => {
  const navigate = useNavigate();

  const [answer, wager, setStep] = useClaimPrizeLoseStore((state) => [
    state.answer,
    state.wager,
    state.setStep,
  ]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <Wager wagerAmount={wager} winnings />
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        {answer && <SelectedAlexLocation answer={answer} win={false} />}
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          Alex was {answer}!
        </div>
      </div>
      <div className='flex flex-grow flex-col' />
      <Button onClick={() => navigate('/')} color='transparent'>
        GO HOME
      </Button>
    </div>
  );
};

export default Lose;
