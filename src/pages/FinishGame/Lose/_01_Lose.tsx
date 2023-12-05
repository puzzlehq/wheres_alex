import PageHeader from '@components/PageHeader';
import SelectedAlexLocation from '@components/SelectedAlexLocation';
import Wager from '@components/Wager';
import Button from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@state/gameStore';
import { Answer } from '@state/RecordTypes/wheres_alex_vxxx';
import { shortenAddress } from '@puzzlehq/sdk';

const Lose = () => {
  const navigate = useNavigate();
  const [currentGame] = useGameStore((state) => [state.currentGame]);

  if (currentGame?.gameNotification.recordData.ix !== '9u32') {
    return (
      <div className='flex h-full w-full flex-col justify-center gap-4'>
        <p>oops! you aren't supposed to be here</p>
        <div className='flex flex-grow flex-col' />
        <Button onClick={() => navigate('/')} color='transparent'>
          GO HOME
        </Button>
      </div>
    );
  }

  const wager = currentGame?.gameNotification.recordData.total_pot ?? 0 / 2;
  const answer =
    currentGame?.gameNotification.recordData.challenger_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const user = currentGame.gameNotification.recordData.owner;
  const opponent_address =
    currentGame.gameNotification.recordData.opponent_address;
  const challenger_address =
    currentGame.gameNotification.recordData.challenger_address;
  const opponent_answer =
    currentGame.gameNotification.recordData.opponent_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const challenger_answer =
    currentGame.gameNotification.recordData.challenger_answer === '0field'
      ? Answer.InTheWeeds
      : Answer.BehindTheBuilding;
  const isChallenger = user === challenger_address;

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <Wager wagerAmount={wager} winnings />
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <div className='flex flex-col gap-2'>
        {answer && <SelectedAlexLocation answer={answer} win={false} />}
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {isChallenger
            ? `You put Alex ${challenger_answer}`
            : `${shortenAddress(
                challenger_address
              )} put Alex ${challenger_answer}`}
        </div>
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {!isChallenger
            ? `You guessed Alex was ${opponent_answer}`
            : `${shortenAddress(
                opponent_address
              )} guessed Alex was ${opponent_answer}`}
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
