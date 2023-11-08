/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom';
import GameInfo from '../components/GameInfo';

function NotifyOtherPlayerSection() {
  const navigate = useNavigate();
  const navigateBackToHome = () => {
    navigate('/'); // Navigate to the start-wager page
  };

  return (
    <button
      onClick={navigateBackToHome}
      className='mt-5 self-center self-stretch whitespace-nowrap rounded-[200px] bg-pink-300 px-5 py-6 text-center text-2xl font-extrabold tracking-tight text-black'
    >
      NOTIFY OTHER PLAYER
    </button>
  );
}

function StartAnotherGameSection() {
  const navigate = useNavigate();
  const navigateBackToNewGame = () => {
    navigate('/new-game'); // Navigate to the start-wager page
  };

  return (
    <button
      onClick={navigateBackToNewGame}
      className='mt-5 self-center self-stretch whitespace-nowrap rounded-[200px] bg-yellow px-5 py-6 text-center text-2xl font-extrabold tracking-tight text-black'
    >
      START ANOTHER GAME
    </button>
  );
}

function TakeHomeSection() {
  const navigate = useNavigate();
  return (
    <a
      href='/'
      onClick={() => navigate('/')}
      className='mt-7 self-center whitespace-nowrap text-base font-extrabold text-gray'
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
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <GameInfo gameMultisig={gameMultisig} eventID={eventID} />
        <NotifyOtherPlayerSection />
        <StartAnotherGameSection />
        <TakeHomeSection />
      </div>
    </main>
  );
}

export default GameStarted;
