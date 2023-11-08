/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom';
import GameInfo from '../../components/GameInfo';
import Button from '../../components/Button';

function NotifyOtherPlayerSection() {
  const navigate = useNavigate();
  const navigateBackToHome = () => {
    navigate('/'); // Navigate to the start-wager page
  };

  return (
    <Button
      onClick={navigateBackToHome}
      color='pink'
    >
      NOTIFY OTHER PLAYER
    </Button>
  );
}

function StartAnotherGameSection() {
  const navigate = useNavigate();
  const navigateBackToNewGame = () => {
    navigate('/new-game'); // Navigate to the start-wager page
  };

  return (
    <Button
      onClick={navigateBackToNewGame}
      color='yellow'
    >
      START ANOTHER GAME
    </Button>
  );
}

function TakeHomeSection() {
  const navigate = useNavigate();
  return (
    <a
      href='/'
      onClick={() => navigate('/')}
      className='mt-7 self-center whitespace-nowrap text-base font-extrabold text-primary-gray'
    >
      TAKE ME BACK HOME
    </a>
  );
}

function GameStarted() {
  const location = useLocation();
  const gameMultisig = location.state?.gameMultisig || 'N/A';
  console.log(gameMultisig);
  const eventID = location.state?.eventID || 'N/A';
  console.log(eventID);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full h-full flex-col items-center bg-neutral-900 px-5'>
        <GameInfo gameMultisig={gameMultisig} eventID={eventID} />
        <div className='flex flex-col flex-grow'/>
        <NotifyOtherPlayerSection />
        <StartAnotherGameSection />
        <TakeHomeSection />
      </div>
    </main>
  );
}

export default GameStarted;
