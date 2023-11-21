/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { NakedBanner } from '../../components/Banner.js';
import { useEffect } from 'react';

function Checking() {
  const [_2, setStep] = useAtom(acceptGameStepAtom);

  useEffect(() => {
    setTimeout(() => {
      setStep('11a_win');
    }, 5000);
  }, []);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <NakedBanner
          title={
            <>
              Checking
              <br />
              Answer...
            </>
          }
          body={
            <p className='text-primary-white mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
              Aleo TXN ID: xxxxxxx
            </p>
          }
        />
      </div>
    </main>
  );
}

export default Checking;
