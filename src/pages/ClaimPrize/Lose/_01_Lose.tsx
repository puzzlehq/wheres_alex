import PageHeader from "../../../components/PageHeader";
import SelectedAlexLocation from "../../../components/SelectedAlexLocation";
import Wager from "../../../components/Wager";
import Button from "../../../components/Button";
import { Step, useClaimPrizeLoseStore } from "./store";
import { useNavigate } from "react-router-dom";

const Lose = () => {
  const navigate = useNavigate();

  const [answer, wager, setStep, claim] = useClaimPrizeLoseStore((state) => [state.answer, state.wager, state.setStep, state.claimPrize]);

  return (
    <div className='flex flex-col w-full h-full justify-center gap-4'>
      <Wager wagerAmount={wager} winnings/>
      <PageHeader text="WHERE IS ALEX" bg='bg-primary-blue' />
      <div className="flex flex-col gap-2">
        <SelectedAlexLocation answer={answer} win={false} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          Alex was {answer}!
        </div>
      </div>
      <div className="flex flex-col flex-grow"/>
      <Button
        color='green'
        onClick={async () => {
          await claim();
          setStep(Step._02_Gameover)
        }}
      >
        CLAIM CONSOLATION PRIZE
      </Button>
      <Button
        color='pink'
        onClick={() => navigate('/')}
      >
        DOUBLE OR NOTHING
      </Button>
    </div>
  );
};

export default Lose;
