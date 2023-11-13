import AcceptGamePage from "./_01_AcceptGame";
import FindAlex from "./_02_FindAlex";
import Confirmed from "./_03_Confirmed";
import { atom, useAtom } from "jotai";
import { AcceptGameInputs } from "../../state/manager";
import { useNavigate } from "react-router-dom";

export type Step = '1_AcceptGame' | '2_FindAlex' | '3_Confirmed';
export const acceptGameInputsAtom = atom<Partial<AcceptGameInputs>>({});
export const acceptGameStepAtom = atom<Step>('1_AcceptGame');

const AcceptGame = () => {
  const navigate = useNavigate();
  const [_, setInputs] = useAtom(acceptGameInputsAtom);
  const [step, setStep] = useAtom(acceptGameStepAtom);

  const done = () => {
    setInputs({});
    setStep('1_AcceptGame');
    navigate('/home');
  };

  return (
    <div className="flex flex-col w-full h-full">
      {step === '1_AcceptGame' && <AcceptGamePage />}
      {step === '2_FindAlex' && <FindAlex />}
      {step === '3_Confirmed' && <Confirmed done={done}/>}
    </div>
  )
}

export default AcceptGame;