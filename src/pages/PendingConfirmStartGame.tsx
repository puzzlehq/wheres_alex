import { useLocation } from 'react-router-dom';
import GameInfo from '../components/GameInfo';

/* eslint-disable @typescript-eslint/no-explicit-any */
function NotifyOtherPlayerSection() {
  return (
    <section className='bg-pink-300 mt-24 flex w-full flex-col self-stretch rounded-[200px] px-5 py-6 max-md:mt-10'>
      <h2 className='self-center whitespace-nowrap text-center text-2xl font-extrabold tracking-tight text-black'>
        NOTIFY OTHER PLAYER
      </h2>
    </section>
  );
}

function StartAnotherGameSection() {
  return (
    <section className='mt-5 flex w-full flex-col self-stretch rounded-[200px] bg-yellow px-5 py-6'>
      <h2 className='self-center whitespace-nowrap text-center text-2xl font-extrabold tracking-tight text-black'>
        START ANOTHER GAME
      </h2>
    </section>
  );
}

function TakeHomeSection() {
  return (
    <p className='mt-7 self-center whitespace-nowrap text-base font-extrabold text-gray'>
      TAKE ME BACK HOME
    </p>
  );
}

function PendingConfirmStartGame() {
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

export default PendingConfirmStartGame;
