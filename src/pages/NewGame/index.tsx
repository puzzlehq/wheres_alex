import NewGamePage from './_01_NewGame';
import HideAlex from './_02_HideAlex';
import StartWager from './_03_StartWager';
import ConfirmStartGame from './_04_ConfirmStartGame';
import GameStarted from './_05_GameStarted';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Step, useNewGameStore } from './store';
import { useEffect } from 'react';
import { useInitCurrentGame } from '@hooks/currentGame';
import { useEventHandling } from '@hooks/eventHandling';
import { useAccount } from '@puzzlehq/sdk';

const NewGame = () => {
  const navigate = useNavigate();
  const [step, eventId, inputs, setInputs, setEventId, setStep] = useNewGameStore((state) => [
    state.step,
    state.eventId,
    state.inputs,
    state.setInputs,
    state.setEventId,
    state.setStep,
  ]);

  const { account } = useAccount();

  useEffect(() => {
    if (!account) return;
    setInputs({ ...inputs, challenger: account.address });
  }, [account])

  const done = () => {
    setInputs({});
    setStep(Step._01_NewGame);
    navigate('/');
  };

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
    stepName: 'New Game Index',
    onSettled: () => setStep(Step._05_GameStarted),
  });

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
