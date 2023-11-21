/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { NakedBanner } from '../../components/Banner';
import Button from '../../components/Button.js';
import { useNavigate } from 'react-router-dom';
import treasure_open_empty from '../../assets/treasure_open_empty.png';

function Lose() {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const [_2, setStep] = useAtom(acceptGameStepAtom);

  const navigate = useNavigate();

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <NakedBanner
          title='You Lose'
          body={
            <div className='flex flex-col items-center justify-center gap-4'>
              <p className='text-primary-white mb-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
                Better luck next time
              </p>
              <div className='flex flex-col items-center'>
                <p>Amount lost</p>
                <p className='font-header text-4xl text-primary'>
                  {acceptGameInputs.wager_amount ?? 10} pieces
                </p>
              </div>
              <div className='flex justify-center'>
                <img src={treasure_open_empty} className='w-1/3 self-center' />
              </div>

              <div className='flex justify-center'>
                <Button
                  className='w-fit'
                  onClick={() => {
                    navigate('/');
                    setStep('1_AcceptGame');
                    setAcceptGameInputs({});
                  }}
                >
                  Home
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </main>
  );
}

export default Lose;
