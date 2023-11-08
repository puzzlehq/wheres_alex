/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { Step, useNewGameStore } from './store';

function StartWager() {
  const [wager, setWager, setStep] = useNewGameStore((state) => [state.wager, state.setWager, state.setStep])

  // Determine input text color based on localAmount value
  const inputTextColor = wager !== 0 ? 'text-primary-green' : '';

  // Determine input opacity based on localAmount value
  const inputOpacity = wager === 0 ? 'opacity-40' : '';

  const isDisabled = wager <= 0;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={3} />
        <PageHeader bg='bg-primary-blue' text='MAKE YOUR WAGER' />
        <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
          <input
            type='number'
            value={wager === 0 ? undefined : wager}
            onChange={(e) => setWager(Number(e.target.value))}
            className={`mt-14 flex w-full flex-col self-stretch border-[3px] border-solid border-[color:var(--Grey,#868686)] px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} w-full self-center text-center text-3xl font-bold`}
            placeholder='Enter amount'
          />
          <div className='mb-24 mt-3 self-center whitespace-nowrap text-center text-base font-bold text-primary-green'>
            Puzzle Pieces
          </div>
        </div>
        <Button
          onClick={() => setStep(Step._04_ConfirmStartGame)}
          disabled={isDisabled}
          color='green'
          className={`self-center whitespace-nowrap text-center text-3xl font-extrabold tracking-tight text-primary-black 
                        ${isDisabled ? 'bg-opacity-40' : 'hover:bg-primary-green'} 
                        w-full self-stretch rounded-[200px] bg-primary-green p-5 max-md:ml-px max-md:mt-10`}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default StartWager;
