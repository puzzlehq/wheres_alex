import { Step, useNewGameStore } from "./store"
import NewGamePage from './_01_NewGame';
import HideAlex from "./_02_HideAlex";
import StartWager from "./_03_StartWager";
import ConfirmStartGame from "./_04_ConfirmStartGame";
import GameStarted from "./_05_GameStarted";

const NewGame = () => {
  const [step] = useNewGameStore((state) => [state.step]);

  return (
    <div className="flex flex-col h-full w-full">
      {step === Step._01_NewGame && <NewGamePage/>}
      {step === Step._02_HideAlex && <HideAlex/>}
      {step === Step._03_StartWager && <StartWager/>}
      {step === Step._04_ConfirmStartGame && <ConfirmStartGame/>}
      {step === Step._05_GameStarted && <GameStarted/>}
    </div>
  )
}

export default NewGame