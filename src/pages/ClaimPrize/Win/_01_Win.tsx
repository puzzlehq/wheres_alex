import PageHeader from "../../../components/PageHeader";
import SelectedTreasureLocation from "../../../components/SelectedTreasureLocation";
import Wager from "../../../components/Wager";
import Button from "../../../components/Button";
import { Answer } from "../../../state/game_states";
import { Step, useClaimPrizeWinStore } from "./store";

const Win = () => {
  const [answer, wager, setStep, claim] = useClaimPrizeWinStore((state) => [state.answer, state.wager, state.setStep, state.claimWinPrize]);
  
  return (
    <div className='flex flex-col w-full h-full justify-center gap-4'>
      <Wager wagerAmount={wager} winnings/>
      <PageHeader text={`WHERE'S THE TREASURE?`} bg='bg-primary-blue' />
      <div className="flex flex-col gap-2">
        <SelectedTreasureLocation answer={Answer.BehindTheBuilding} win={true} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          The treasure was {answer}!
        </div>
      </div>
      <div className="flex flex-col flex-grow"/>
      <Button
        color="green"
        onClick={async () => {
          await claim();
          setStep(Step._02_GameOver)
        }}
      >
        CLAIM WINNINGS
      </Button>
    </div>
  );
};

export default Win;
