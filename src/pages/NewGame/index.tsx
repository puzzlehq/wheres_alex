import NewGamePage from './_01_NewGame';
import HideTreasure from './_02_HideTreasure';
import StartWager from './_03_StartWager';
import ConfirmStartGame from './_04_ConfirmStartGame';
import GameStarted from './_05_GameStarted';
import { ProposeGameInputs } from '../../state/manager';
import { atom, useAtom } from 'jotai';

export type Step =
  | '1_NewGame'
  | '2_HideTreasure'
  | '3_StartWager'
  | '4_ConfirmStartGame'
  | '5_GameStarted';
export const proposeGameInputsAtom = atom<Partial<ProposeGameInputs>>({
  opponent: '',
});
export const proposeGameStepAtom = atom<Step>('1_NewGame');
export const eventIdAtom = atom<string | undefined>(undefined);

const NewGame = () => {
  const [step] = useAtom(proposeGameStepAtom);

  return (
    <div className='flex h-full w-full flex-col'>
      {step === '1_NewGame' && <NewGamePage />}
      {step === '2_HideTreasure' && <HideTreasure />}
      {step === '3_StartWager' && <StartWager />}
      {step === '4_ConfirmStartGame' && <ConfirmStartGame />}
      {step === '5_GameStarted' && <GameStarted />}
    </div>
  );
};

export default NewGame;
