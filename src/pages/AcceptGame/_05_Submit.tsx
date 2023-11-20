/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { Banner } from '../../components/Banner';

function Submit() {
  const [acceptGameInputs, _] = useAtom(acceptGameInputsAtom);
  const [_, setStep] = useAtom(acceptGameStepAtom);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <Banner
          title='Submit'
          body={
            <>
              <p className='mt-8 mb-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
              A private Aleo state update will take place on your device tracking your choice, your puzzle pieces at risk, and an Aleo network fee. Then, a zero knowledge proof of these encrypted state updates will be done on your phone and sent to the network to verify and update state!              </p>
              <div className='flex flex-col'>
                <p>Wager Amount</p>
                <p className='font-header text-primary text-4xl'>{acceptGameInputs.wagerAmount} pieces</p>
              </div>
            </>
          }
          onClickLeft={() => {
            setStep('4_Wager');
          }}
          onClickRight={() => 
            setStep('4_Wager')
          }
          step={1}
          totalSteps={5}
        />
        </div>
    </main>
  );
}

export default Submit;
