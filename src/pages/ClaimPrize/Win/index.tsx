import Win from "./_01_Win";
import GameOver from "./_02_Gameover";
import { Step, useClaimPrizeWinStore } from "./store"

export const LoseRoute = () => {
  
  const [step] = useClaimPrizeWinStore((state) => [state.step]);

  return (
    <div className="flex flex-col h-full w-full">
      {step === Step._01_Claim && <Win/>}
      {step === Step._02_Gameover && <GameOver/>}
    </div>
  )
}