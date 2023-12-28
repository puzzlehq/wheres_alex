import { Step, useRevealAnswerStore } from './store';
import Reveal from './_01_Reveal';
import Confirmed from './_02_Confirmed';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useInitCurrentGame } from '@hooks/currentGame';
import { useEventHandling } from '@hooks/eventHandling';

const RevealAnswer = () => {
  const [step, eventId, setEventId, setStep] = useRevealAnswerStore((state) => [
    state.step,
    state.eventId,
    state.setEventId,
    state.setStep
  ]);
  const [searchParams] = useSearchParams();

  useInitCurrentGame();
  useEffect(() => {
    const _eventId = searchParams.get('eventId');
    if (_eventId) {
      setEventId(_eventId);
    }
  }, [searchParams]);

  useEventHandling({
    id: eventId,
    stepName: 'Reveal Index',
    onSettled: () => setStep(Step._02_Confirmed),
  });

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Finish && <Reveal />}
      {step === Step._02_Confirmed && <Confirmed />}
    </div>
  );
};

export default RevealAnswer;
