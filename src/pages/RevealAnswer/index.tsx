import { Step, useRevealAnswerStore } from './store';
import Reveal from './_01_Reveal';
import Confirmed from './_02_Confirmed';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const RevealAnswer = () => {
  const [step, setEventId] = useRevealAnswerStore((state) => [state.step, state.setEventId]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const _eventId = searchParams.get('eventId');
    if (_eventId) {
      setEventId(_eventId);
    }
  }, [searchParams])

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Finish && <Reveal />}
      {step === Step._02_Confirmed && <Confirmed />}
    </div>
  );
};

export default RevealAnswer;
