import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import SelectedAlexLocation from "../../../components/SelectedAlexLocation";
import Wager from "../../../components/Wager";
import Button from "../../../components/Button";

type AcceptGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
};

const FinishGameWinClaim = ({ challenger, wager }: AcceptGameProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const answer = location.state?.answer ?? 'N/A';
  return (
    <div className='flex flex-col w-full h-full justify-center gap-4'>
      <Wager wagerAmount={wager} winnings/>
      <PageHeader text="WHERE IS ALEX" bg='bg-primary-blue' />
      <div className="flex flex-col gap-2">
        <SelectedAlexLocation answer={'Behind the Building'} win={false} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          Alex was {answer}!
        </div>
      </div>
      <div className="flex flex-col flex-grow"/>
      <Button
        color="green"
        onClick={() => navigate('/')}
      >
        CLAIM WINNINGS
      </Button>
    </div>
  );
};

export default FinishGameWinClaim;
