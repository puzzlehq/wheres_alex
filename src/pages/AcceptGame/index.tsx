import { Step, useAcceptGameStore } from "./store"
import AcceptGamePage from "./_01_AcceptGame";
import FindAlex from "./_02_FindAlex";
import Confirmed from "./_03_Confirmed";

const AcceptGame = () => {
  const [step] = useAcceptGameStore((state) => [state.step]);

  return (
    <div className="flex flex-col w-full h-full">
      {step === Step._01_AcceptGame && <AcceptGamePage/>}
      {step === Step._02_FindAlex && <FindAlex/>}
      {step === Step._03_Confirmed && <Confirmed/>}
    </div>
  )
}

export default AcceptGame;