import PageHeader from '@components/PageHeader';
import SelectedAlexLocation from '@components/SelectedAlexLocation';
import Wager from '@components/Wager';
import Button from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@state/gameStore';
import { getAnswer } from '@state/RecordTypes/wheres_alex_vxxx';
import { shortenAddress } from '@puzzlehq/sdk';
import { useInitCurrentGame } from '@hooks/currentGame';

const Lose = () => {
  useInitCurrentGame();
  const navigate = useNavigate();
  const [currentGame] = useGameStore((state) => [state.currentGame]);

  if (!currentGame || currentGame.gameNotification.recordData.ix !== '9u32') {
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

  const {
    total_pot,
    challenger_answer,
    owner,
    opponent_address,
    opponent_answer,
    challenger_address,
  } = currentGame.gameNotification.recordData;

  const wager = (total_pot ?? 0) / 2;
  const user = owner;
  const isChallenger = user === challenger_address;

  return (
    <div className='flex h-full w-full flex-col justify-center gap-4'>
      <PageHeader text="WHERE'S ALEX" bg='bg-primary-blue' />
      <Wager wagerAmount={wager} winnings />
      <div className='flex flex-col gap-2'>
        {challenger_answer && (
          <SelectedAlexLocation
            answer={getAnswer(challenger_answer)}
            win={false}
          />
        )}
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {isChallenger
            ? `You put Alex ${getAnswer(challenger_answer)}`
            : `${shortenAddress(challenger_address)} put Alex ${getAnswer(
                challenger_answer
              )}`}
        </div>
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {!isChallenger
            ? `You guessed Alex was ${getAnswer(opponent_answer)}`
            : `${shortenAddress(opponent_address)} guessed Alex was ${getAnswer(
                opponent_answer
              )}`}
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
