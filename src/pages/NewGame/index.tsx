import NewGamePage from './_01_NewGame';
import HideAlex from './_02_HideAlex';
import StartWager from './_03_StartWager';
import ConfirmStartGame from './_04_ConfirmStartGame';
import GameStarted from './_05_GameStarted';
import { useNavigate } from 'react-router-dom';
import { Step, useNewGameStore } from './store';

const NewGame = () => {
  const navigate = useNavigate();
  const [step, setInputs, setStep] = useNewGameStore((state) => [
    state.step,
    state.setInputs,
    state.setStep,
  ]);

  const done = () => {
    setInputs({});
    setStep(Step._01_NewGame);
    navigate('/');
  };

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_NewGame && <NewGamePage />}
      {step === Step._02_HideAlex && <HideAlex />}
      {step === Step._03_StartWager && <StartWager />}
      {step === Step._04_ConfirmStartGame && <ConfirmStartGame />}
      {step === Step._05_GameStarted && <GameStarted done={done} />}
    </div>
  );
};

export default NewGame;
