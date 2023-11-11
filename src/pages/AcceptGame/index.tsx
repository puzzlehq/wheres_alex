import AcceptGamePage from "./_01_AcceptGame";
import FindAlex from "./_02_FindAlex";
import Confirmed from "./_03_Confirmed";
import { atom, useAtom } from "jotai";
import { AcceptGameInputs } from "../../state/manager";

export type Step = '1_AcceptGame' | '2_FindAlex' | '3_Confirmed';
export const acceptGameInputsAtom = atom<Partial<AcceptGameInputs & {step: Step}>>({step: '1_AcceptGame'});

const AcceptGame = () => {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);

  const step = acceptGameInputs.step ?? '1_AcceptGame' as Step;

  return (
    <div className="flex flex-col w-full h-full">
      {step === '1_AcceptGame' && <AcceptGamePage/>}
      {step === '2_FindAlex' && <FindAlex/>}
      {step === '3_Confirmed' && <Confirmed/>}
    </div>
  )
}

export default AcceptGame;