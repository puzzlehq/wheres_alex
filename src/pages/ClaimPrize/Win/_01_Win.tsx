import PageHeader from '../../../components/PageHeader';
import SelectedAlexLocation from '../../../components/SelectedAlexLocation';
import Wager from '../../../components/Wager';
import Button from '../../../components/Button';
import { Step, useClaimPrizeWinStore } from './store';
import { Answer } from '../../../state/RecordTypes/wheres_alex_vxxx';

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
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        <SelectedAlexLocation answer={Answer.BehindTheBuilding} win={true} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          Alex was {answer}!
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
