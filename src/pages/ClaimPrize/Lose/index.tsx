import Lose from "./_01_Lose";
import GameOver from "./_02_Gameover";
import { Step, useClaimPrizeLoseStore } from "./store"


export const LoseRoute = () => {
  
  const [step] = useClaimPrizeLoseStore((state) => [state.step]);

  return (
    <div className="flex flex-col h-full w-full">
      {step === Step._01_Claim && <Lose/>}
      {step === Step._02_GameOver && <GameOver/>}
    </div>
  )
}