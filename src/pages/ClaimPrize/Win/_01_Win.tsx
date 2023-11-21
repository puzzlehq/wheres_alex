import PageHeader from '../../../components/PageHeader';
import SelectedTreasureLocation from '../../../components/SelectedTreasureLocation';
import Wager from '../../../components/Wager';
import Button from '../../../components/Button';
import { Answer } from '../../../state/game_states';
import { Step, useClaimPrizeWinStore } from './store';

const Win = () => {
  const [answer, wager, setStep, claim] = useClaimPrizeWinStore((state) => [
    state.answer,
    state.wager,
    state.setStep,
    state.claimWinPrize,
  ]);

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <Wager wagerAmount={wager} winnings />
      <PageHeader text={`WHERE'S THE TREASURE?`} bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        <SelectedTreasureLocation answer={Answer.right} win={true} />
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
        CLAIM WINNINGS
      </Button>
    </div>
  );
};

export default Win;
