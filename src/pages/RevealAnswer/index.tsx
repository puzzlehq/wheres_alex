import { Step, useRevealAnswerStore } from './store';
import Reveal from './_01_Reveal';
import Confirmed from './_02_Confirmed';

const FinishGame = () => {
  const [step] = useRevealAnswerStore((state) => [state.step]);

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Finish && <Reveal />}
      {step === Step._02_Confirmed && <Confirmed />}
    </div>
  );
};

export default FinishGame;
