import { useEffect } from 'react';
import Win from './_01_Win';
import GameOver from './_02_Gameover';
import { Step, useClaimPrizeWinStore } from './store';
import { useSearchParams } from 'react-router-dom';
import { useInitCurrentGame } from '@hooks/currentGame';
import { useEventHandling } from '@hooks/eventHandling';

const WinRoute = () => {
  const [step, eventId, setEventId, setStep] = useClaimPrizeWinStore((state) => [
    state.step,
    state.eventId,
    state.setEventId,
    state.setStep,
  ]);
  const [searchParams] = useSearchParams();

  const { currentGame } = useInitCurrentGame();
  useEffect(() => {
    const _eventId = searchParams.get('eventId');
    if (_eventId) {
      setEventId(_eventId);
    }
  }, [searchParams]);

  useEventHandling({
    id: eventId,
    address: currentGame?.gameNotification.recordData.game_multisig,
    multisig: true,
    stepName: 'Win Index',
    onSettled: () => setStep(Step._02_GameOver)
  });

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Claim && <Win />}
      {step === Step._02_GameOver && <GameOver />}
    </div>
  );
};

export default WinRoute;
