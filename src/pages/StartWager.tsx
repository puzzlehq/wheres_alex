/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import PageHeader from '../components/PageHeader';

type ChooseWagerAmountProps = {
  setAmount: (number: number) => void;
};

function ChooseWagerAmount({ setAmount }: ChooseWagerAmountProps) {
  const [localAmount, setLocalAmount] = useState<string>('0');

  const handleAmountChange = (e: { target: { value: any } }) => {
    const newAmount = e.target.value;
    setLocalAmount(newAmount);
    setAmount(Number(newAmount));
    console.log(localAmount);
  };

  // Determine input text color based on localAmount value
  const inputTextColor = localAmount !== '0' ? 'text-green' : '';

  // Determine input opacity based on localAmount value
  const inputOpacity = localAmount === '0' ? 'opacity-40' : '';

  return (
    <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
      <input
        type='number'
        value={localAmount === '0' ? '' : localAmount}
        onChange={handleAmountChange}
        className={`mt-14 flex w-full flex-col self-stretch border-[3px] border-solid border-[color:var(--Grey,#868686)] px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} w-full self-center text-center text-3xl font-bold`}
        placeholder='Enter amount'
      />
      <div className='mb-24 mt-3 self-center whitespace-nowrap text-center text-base font-bold text-green'>
        Puzzle Pieces
      </div>
    </div>
  );
}

function StartWager() {
  const [amount, setAmount] = useState<number>(0);
  const location = useLocation();
  const opponent = location.state?.opponent || 'N/A';
  console.log(opponent);
  const answer = location.state?.answer || 'N/A';
  console.log(answer);

  const navigate = useNavigate();

  const navigateToStartWager = () => {
    navigate('/confirm-start-game', {
      state: { opponent, answer, amount },
    }); // Navigate to the confirm-start-game page
  };

  const isDisabled = amount <= 0;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={3} opponent={opponent} answer={answer} />
        <PageHeader bg='bg-blue' text='MAKE YOUR WAGER' />
        <ChooseWagerAmount setAmount={setAmount} />
        <button
          onClick={navigateToStartWager}
          disabled={isDisabled}
          className={`self-center whitespace-nowrap text-center text-3xl font-extrabold tracking-tight text-black 
                        ${isDisabled ? 'bg-opacity-40' : 'hover:bg-green'} 
                        mt-4 w-full self-stretch rounded-[200px] bg-green p-5 max-md:ml-px max-md:mt-10`}
        >
          NEXT
        </button>
      </div>
    </main>
  );
}

export default StartWager;
