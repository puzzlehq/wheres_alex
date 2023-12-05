import { useEffect } from 'react';
import Win from './_01_Win';
import GameOver from './_02_Gameover';
import { Step, useClaimPrizeWinStore } from './store';
import { useSearchParams } from 'react-router-dom';

const WinRoute = () => {
  const [step, setEventId] = useClaimPrizeWinStore((state) => [state.step, state.setEventId]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const _eventId = searchParams.get('eventId');
    if (_eventId) {
      setEventId(_eventId);
    }
  }, [searchParams])

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Claim && <Win />}
      {step === Step._02_GameOver && <GameOver />}
    </div>
  );
};

export default WinRoute;
