import PageHeader from '../../../components/PageHeader';
import SelectedTreasureLocation from '../../../components/SelectedTreasureLocation';
import Wager from '../../../components/Wager';
import Button from '../../../components/Button';
import { Step, useClaimPrizeLoseStore } from './store';
import { useNavigate } from 'react-router-dom';

const Lose = () => {
  const navigate = useNavigate();

  const [answer, wager, setStep, claim] = useClaimPrizeLoseStore((state) => [
    state.answer,
    state.wager,
    state.setStep,
    state.claimLosePrize,
  ]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <Wager wagerAmount={wager} winnings />
      <PageHeader text={`WHERE'S THE TREASURE?`} bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        {answer && <SelectedTreasureLocation answer={answer} win={false} />}
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          The treasure was {answer}!
        </div>
      </div>
      <div className='flex flex-grow flex-col' />
      <Button
        color='green'
        onClick={async () => {
          await claim();
          setStep(Step._02_GameOver);
        }}
      >
        CLAIM CONSOLATION PRIZE
      </Button>
      <Button color='pink' onClick={() => navigate('/')}>
        DOUBLE OR NOTHING
      </Button>
    </div>
  );
};

export default Lose;
