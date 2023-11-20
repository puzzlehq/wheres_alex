/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { Banner } from '../../components/Banner';

function Wager() {
  const [acceptGameInputs, _] = useAtom(acceptGameInputsAtom);
  const [_, setStep] = useAtom(acceptGameStepAtom);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <Banner
          title={<>Use Yer<br/>Pieces</>}
          body={
            <>
              <p className='mt-8 mb-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
                Puzzle pieces are the keys needed to open the chests and check for the treasure. If you guess right, you win the matching amount of Puzzle Pieces from the treasure! But beware -- Pirate Leo the Lion is a pirate! If you guess wrong, Leo will loot your puzzle pieces!              </p>
              <div className='flex flex-col'>
                <p>Wager Amount</p>
                <p className='font-header text-primary text-4xl'>{acceptGameInputs.wagerAmount} pieces</p>
              </div>
            </>
          }
          onClickLeft={() => {
            setStep('3_AboutPuzzle');
          }}
          onClickRight={() => 
            setStep('5_Submit')
          }
          step={3}
          totalSteps={5}
        />
        </div>
    </main>
  );
}

export default Wager;
