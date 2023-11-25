import AcceptGamePage from './_01_AcceptGame';
import FindAlex from './_02_FindAlex';
import Confirmed from './_03_Confirmed';
import { useNavigate } from 'react-router-dom';
import { Step, useAcceptGameStore } from './store';

const AcceptGame = () => {
  const navigate = useNavigate();
  const [step, setStep, setInputs] = useAcceptGameStore((state) => [state.step, state.setStep, state.setInputs])

  const done = () => {
    setInputs({});
    setStep(Step._01_AcceptGame);
    navigate('/');
  };

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_AcceptGame && <AcceptGamePage />}
      {step === Step._02_FindAlex && <FindAlex />}
      {step === Step._03_Confirmed && <Confirmed done={done} />}
    </div>
  );
};

export default AcceptGame;
