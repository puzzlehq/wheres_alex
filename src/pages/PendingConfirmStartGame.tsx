/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
    return (
      <nav className="justify-between items-start self-stretch flex w-full gap-5 mt-11 max-md:justify-center max-md:mr-px max-md:mt-10">
        <a href="#" className="text-white text-center text-xs font-extrabold tracking-tight self-stretch">
            1. CHALLENGE
        </a>
        <div className="text-white text-center text-xs font-extrabold tracking-tight self-stretch">
          <a href="#" className="text-white text-center text-xs font-extrabold tracking-tight self-stretch">
            2. HIDE ALEX
          </a>
        </div>
        <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
          <a href="#" className="text-white underline text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
            3.WAGER
          </a>
        </div>
      </nav>
    );
}
  
function Section() {
    return (
      <section className="justify-center items-center bg-sky-400 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
        <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> MAKE YOUR </h1>
      </section>
    );
}

type ChooseWagerAmountProps = {
    setAmount: (number: number) => void;
}

function ChooseWagerAmount({ setAmount }: ChooseWagerAmountProps) {
    const [localAmount, setLocalAmount] = useState<number>(0);

    const handleAmountChange = (e: { target: { value: any; }; }) => {
        const newAmount = Number(e.target.value);
        setLocalAmount(newAmount);
        setAmount(newAmount);
    };

    return (
        <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
          <input 
            type="number" 
            value={localAmount}
            onChange={handleAmountChange}
            className="border-[color:var(--Grey,#868686)] self-stretch flex w-full flex-col mt-14 px-5 py-7 border-[3px] border-solid max-md:mt-10 text-lime-600 text-center text-3xl font-bold opacity-40 self-center w-full"
            placeholder="Enter amount"
          />
          <div className="text-lime-600 text-center text-base font-bold self-center mt-3 whitespace-nowrap mb-24">
            Puzzle Pieces
          </div>
        </div>
    );
}




type NextButtonProps = {
    isDisabled: boolean;
    amount: number;
}


function NextButton({isDisabled, amount}: NextButtonProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const opponent = location.state?.walletAddress || "N/A";
    const answer = location.state?.answer || "N/A";

    const navigateToStartWager = () => {
        navigate('/confirm-start-game', {
            state: {opponent, answer, amount}
        });  // Navigate to the start-wager page
    }
    return (
        <button 
            onClick={navigateToStartWager}
            disabled={isDisabled}
            className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap 
                        ${isDisabled ? 'bg-opacity-40' : 'hover:bg-[#4EC331]'} 
                        bg-lime-600 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
        > 
            NEXT 
        </button>
    );
}

function PendingConfirmStartGame() {
    const [amount, setAmount] = useState<number>(0);

    return (
        <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
                <Navigation />
                <Section />
                <ChooseWagerAmount setAmount={setAmount} />
                <NextButton isDisabled={amount <= 0} amount={amount}/>
            </div>
        </main>
    );
}

export default PendingConfirmStartGame;