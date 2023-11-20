import AcceptGamePage from "./_01_AcceptGame";
import FindTreasure from "./_02_FindTreasure";
import Confirmed from "./_03_Confirmed";
import { atom, useAtom } from "jotai";
import { AcceptGameInputs } from "../../state/manager";
import { useNavigate } from "react-router-dom";

export type Step = '1_AcceptGame' | '2_FindTreasure' | '3_Confirmed';
export const acceptGameInputsAtom = atom<Partial<AcceptGameInputs>>({});
export const acceptGameStepAtom = atom<Step>('1_AcceptGame');
export const eventIdAtom = atom<string | undefined>(undefined);

const AcceptGame = () => {
  const navigate = useNavigate();
  const [_, setInputs] = useAtom(acceptGameInputsAtom);
  const [step, setStep] = useAtom(acceptGameStepAtom);

  const done = () => {
    setInputs({});
    setStep('1_AcceptGame');
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full h-full">
      {step === '1_AcceptGame' && <AcceptGamePage />}
      {step === '2_FindTreasure' && <FindTreasure />}
      {step === '3_Confirmed' && <Confirmed done={done}/>}
    </div>
  )
}

export default AcceptGame;