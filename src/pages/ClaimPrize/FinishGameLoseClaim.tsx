import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import SelectedAlexLocation from "../../components/SelectedAlexLocation";
import Wager from "../../components/Wager";

type AcceptGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
};

const FinishGameLoseClaim = ({ challenger, wager }: AcceptGameProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const answer = location.state?.answer ?? 'N/A';
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
      <button
        className={`w-full self-center whitespace-nowrap rounded-[200px] bg-primary-green p-5 text-center
                    text-3xl font-extrabold tracking-tight text-primary-black max-md:ml-px`}
        onClick={() => navigate('/')}
      >
        CLAIM CONSOLATION PRIZE
      </button>
      <button
        className={`w-full self-center whitespace-nowrap rounded-[200px] bg-primary-pink p-5 text-center
                    text-3xl font-extrabold tracking-tight text-primary-black max-md:ml-px`}
        onClick={() => navigate('/')}
      >
        DOUBLE OR NOTHING
      </button>
    </div>
  );
};

export default FinishGameLoseClaim;
