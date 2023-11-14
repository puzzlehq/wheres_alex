import NewGamePage from './_01_NewGame';
import HideAlex from "./_02_HideAlex";
import StartWager from "./_03_StartWager";
import ConfirmStartGame from "./_04_ConfirmStartGame";
import GameStarted from "./_05_GameStarted";
import { ProposeGameInputs } from "../../state/manager";
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

export type Step = '1_NewGame' | '2_HideAlex' | '3_StartWager' | '4_ConfirmStartGame' | '5_GameStarted';
export const proposeGameInputsAtom = atom<Partial<ProposeGameInputs>>({opponent: ''});
export const proposeGameStepAtom = atom<Step>('1_NewGame');
export const eventIdAtom = atom<string | undefined>(undefined);

const NewGame = () => {
  const navigate = useNavigate();
  const [_, setInput] = useAtom(proposeGameInputsAtom);
  const [step, setStep] = useAtom(proposeGameStepAtom);

  const done = () => {
    setInput({});
    setStep('1_NewGame');
    navigate('/');
  }

  return (
    <div className="flex flex-col h-full w-full">
      {step === '1_NewGame' && <NewGamePage />}
      {step === '2_HideAlex' && <HideAlex />}
      {step === '3_StartWager' && <StartWager />}
      {step === '4_ConfirmStartGame' && <ConfirmStartGame />}
      {step === '5_GameStarted' && <GameStarted done={done} />} 
    </div>
  )
}

export default NewGame