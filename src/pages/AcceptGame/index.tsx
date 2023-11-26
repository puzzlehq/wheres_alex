import SubmitWager from './_01_SubmitWager';
import AcceptGamePage from './_02_AcceptGame';
import Confirmed from './_03_Confirmed';
import { useNavigate } from 'react-router-dom';
import { Step, useAcceptGameStore } from './store';

const AcceptGame = () => {
  const navigate = useNavigate();
  const [step, setStep, setAcceptGameInputs, setSubmitWagerInputs] = useAcceptGameStore((state) => [state.step, state.setStep, state.setAcceptGameInputs, state.setSubmitWagerInputs])

  const done = () => {
    setAcceptGameInputs({});
    setSubmitWagerInputs({});
    setStep(Step._01_SubmitWager);
    navigate('/');
  };

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_SubmitWager && <SubmitWager />}
      {step === Step._02_AcceptGame && <AcceptGamePage />}
      {step === Step._03_Confirmed && <Confirmed done={done} />}
    </div>
  );
};

export default AcceptGame;
