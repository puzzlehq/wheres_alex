/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { Banner } from '../../components/Banner';
import ChooseTreasureLocation from '../../components/ChooseTreasureLocation.js';

function Submit() {
  const [acceptGameInputs, _1] = useAtom(acceptGameInputsAtom);
  const [_2, setStep] = useAtom(acceptGameStepAtom);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <Banner
          title='Submit'
          body={
            <>
              <p className='text-primary-white mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
                A private Aleo state update will take place on your device
                tracking your choice, your puzzle pieces at risk, and an Aleo
                network fee. Then, a zero knowledge proof of these encrypted
                state updates will be done on your phone and sent to the network
                to verify and update state!
              </p>
              <div className='py-2'>
                <ChooseTreasureLocation
                  hiding={false}
                  answer={acceptGameInputs.player_two_answer_readable}
                />
              </div>
              <div className='flex flex-col'>
                <p>Wager Amount</p>
                <p className='font-header text-4xl text-primary'>
                  {acceptGameInputs.wager_amount ?? 10} pieces
                </p>
              </div>
            </>
          }
          onClickLeft={() => {
            setStep('4_Wager');
          }}
          onClickRight={() => setStep('6_UpdatingState')}
          step={4}
          totalSteps={5}
        />
      </div>
    </main>
  );
}

export default Submit;
