import Win from './_01_Win';
import GameOver from './_02_Gameover';
import { Step, useClaimPrizeWinStore } from './store';

const WinRoute = () => {
  const [step] = useClaimPrizeWinStore((state) => [state.step]);

  return (
    <div className='flex h-full w-full flex-col'>
      {step === Step._01_Claim && <Win />}
      {step === Step._02_GameOver && <GameOver />}
    </div>
  );
};

export default WinRoute;
