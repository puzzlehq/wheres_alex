/* eslint-disable @typescript-eslint/no-explicit-any */
import { acceptGameInputsAtom, acceptGameStepAtom } from './index.js';
import { useAtom } from 'jotai';
import { NakedBanner } from '../../components/Banner';
import Button from '../../components/Button.js';
import { useNavigate } from 'react-router-dom';
import treasure_open_full from '../../assets/treasure_open_full.png'

function Win() {
  const [acceptGameInputs, setAcceptGameInputs] = useAtom(acceptGameInputsAtom);
  const [_2, setStep] = useAtom(acceptGameStepAtom);

  const navigate = useNavigate();

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5'>
        <NakedBanner
          title='You Won!'
          body={
            <div className='flex flex-col gap-4 justify-center items-center'>
  <p className='mb-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
    Aye matey, you found the booty
  </p>
  <div className='flex flex-col items-center'>
    <p>Amount won</p>
    <p className='font-header text-primary text-4xl'>{acceptGameInputs.wagerAmount ?? 10} pieces</p>
  </div>
  <div className='flex justify-center'>
    <img
      src={treasure_open_full}
      className='w-1/3 self-center'
    />
  </div>

  <div className='flex justify-center'>
    <Button
      className='w-fit'
      onClick={() => {
        navigate('/')
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

export default Win;
