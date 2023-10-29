/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';

function PendingConfirmStartGame() {
  return (
    <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
        <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
            <Navigation />
            <Section />
                <div className="text-white text-sm font-semibold leading-4 border-[color:var(--Grey,#868686)] self-stretch w-full mt-5 pl-3.5 pr-5 py-7 border-[3px] border-solid max-md:mr-px">
                    <label htmlFor="wallet-address">Wallet address</label>
                    <input type="text" id="wallet-address" />
                </div>
                <button
                className="text-black text-center text-xs font-extrabold bg-zinc-500 self-center w-[197px] max-w-full mt-3 px-5 py-3 rounded-[200px]"
                >
                PASTE FROM CLIPBOARD
                </button>
            <NextButton />
        </div>
    </main>
  );
}

function NextButton() {
    const navigate = useNavigate();  // Get the history object

    const navigateToHideAlex = () => {
        navigate('/hide-alex');  // Navigate to the NewGame page
    }
    return (
        <button 
            onClick={navigateToHideAlex}
            className="text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap bg-lime-600 bg-opacity-40 hover:bg-[#4EC331] self-stretch w-full mt-24 p-5 rounded-[200px] max-md:ml-px max-md:mt-10"
        > 
            NEXT 
        </button>
    );
}

function Navigation() {
  return (
    <nav className="justify-between items-start self-stretch flex w-full gap-5 mt-11 max-md:justify-center max-md:mr-px max-md:mt-10">
      <a href="#" className="text-white text-center text-xs font-extrabold tracking-tight underline self-stretch">
        <ul>
          <li>1. CHALLENGE</li>
        </ul>
      </a>
      <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch">
        <a href="#">2. HIDE ALEX</a>
      </div>
      <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
        <a href="#">3.WAGER</a>
      </div>
    </nav>
  );
}

function Section() {
  return (
    <section className="justify-center items-center bg-sky-400 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
      <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> WHO WOULD YOU LIKE TO CHALLENGE? </h1>
    </section>
  );
}

export default PendingConfirmStartGame;