import AcceptGamePage from './_01_AcceptGame';
import FindTreasure from './_02_FindTreasure';
import AboutPuzzle from './_03_AboutPuzzle';
import { atom, useAtom } from 'jotai';
import { AcceptGameInputs } from '../../state/manager';
import Wager from './_04_Wager';
import Submit from './_05_Submit';
import { mapStepAtom } from '../../App';
import { useEffect } from 'react';
import UpdatingState from './_06_UpdatingState';
import CreatingProof from './_07_CreatingProof';
import Sending from './_08_Sending';
import Sent from './_09_Sent';
import Checking from './_10_Checking';
import Win from './_11a_Win';
import Lose from '../ClaimPrize/Lose/_01_Lose';

export type Step =
  | '1_AcceptGame'
  | '2_FindTreasure'
  | '3_AboutPuzzle'
  | '4_Wager'
  | '5_Submit'
  | '6_UpdatingState'
  | '7_CreatingProof'
  | '8_Sending'
  | '9_Sent'
  | '10_Checking'
  | '11a_win'
  | '11b_lose';
export const acceptGameInputsAtom = atom<Partial<AcceptGameInputs>>({});
export const acceptGameStepAtom = atom<Step>('1_AcceptGame');
export const eventIdAtom = atom<string | undefined>(undefined);

const AcceptGame = () => {
  const [_, setInputs] = useAtom(acceptGameInputsAtom);
  const [step, setStep] = useAtom(acceptGameStepAtom);
  const [__, setMapStep] = useAtom(mapStepAtom);

  useEffect(() => {
    if (['6_UpdatingState', '10_Checking'].includes(step)) {
      setMapStep(true);
    } else if (
      ['9_Sent', '11a_win', '11b_lose', '1_AcceptGame'].includes(step)
    ) {
      setMapStep(false);
    }
  }, [step]);

  return (
    <div className='flex h-full w-full flex-col'>
      {step === '1_AcceptGame' && <AcceptGamePage />}
      {step === '2_FindTreasure' && <FindTreasure />}
      {step === '3_AboutPuzzle' && <AboutPuzzle />}
      {step === '4_Wager' && <Wager />}
      {step === '5_Submit' && <Submit />}
      {step === '6_UpdatingState' && <UpdatingState />}
      {step === '7_CreatingProof' && <CreatingProof />}
      {step === '8_Sending' && <Sending />}
      {step === '9_Sent' && <Sent />}
      {step === '10_Checking' && <Checking />}
      {step === '11a_win' && <Win />}
      {step === '11b_lose' && <Lose />}
    </div>
  );
};

export default AcceptGame;
