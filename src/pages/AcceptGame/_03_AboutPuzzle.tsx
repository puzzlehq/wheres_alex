/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { Banner } from '../../components/Banner';
import { usePieces } from '../../state/usePieces';

function AboutPuzzle() {
  const [_, setStep] = useAtom(acceptGameStepAtom);

  const { availableBalance } = usePieces();

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <Banner
          title={<>Puzzle<br/>Pieces on<br/>Aleo</>}
          body={
            <>
              <p className='mt-8 mb-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
                Puzzle is the first onchain org on Aleo and creators of Puzzle Wallet. Puzzle pieces are onchain rewards on Aleo that can be redeemed for items from Puzzle in the future.
              </p>
              <div className='flex flex-col'>
                <p>You have</p>
                <p className='font-header text-primary text-4xl'>{availableBalance} pieces</p>
              </div>
            </>
          }
          onClickLeft={() => {
            setStep('1_AcceptGame');
          }}
          onClickRight={() => 
            setStep('3_Confirmed')
          }
          step={2}
          totalSteps={5}
        />
        </div>
    </main>
  );
}

export default AboutPuzzle;
