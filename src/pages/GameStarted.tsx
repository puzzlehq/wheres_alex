/* eslint-disable @typescript-eslint/no-explicit-any */
import alexHeadImg from '../assets/alex_head.png';
import { useNavigate, useLocation } from 'react-router-dom';
  
function GameInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const gameMultisig = location.state?.gameMultisig || "N/A";
    console.log(gameMultisig);
    const eventID = location.state?.eventID || "N/A";
    console.log(eventID);

    // const navigateBackToHome = () => {
    //     navigate('/');  // Navigate to the start-wager page
    // }

    return (
        <section className="items-center self-stretch flex grow flex-col mt-24 mb-24 max-md:mt-10">
        <img
            src={alexHeadImg}
            className='h-full max-w-[50%] max-h-[5rem] object-contain z-0'
            alt='Alex head'
        />
        <div className="justify-center items-center bg-lime-600 self-stretch flex w-full flex-col px-5 py-1.5">
            <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]">
            GAME BEGUN!
            </h1>
            <p className="text-black text-center text-base font-extrabold leading-4 self-center max-w-[295px] mt-1.5">
            GAME ID: {gameMultisig}
            </p>
            <a
            href="/"
            onClick={() => navigate('/')}
            className="text-black text-center text-base font-extrabold leading-4 underline self-center max-w-[295px] mt-1.5"
            >
            View Confirmation: {eventID}
            </a>
        </div>
        </section>
    );
}

function NotifyOtherPlayerSection() {
    const navigate = useNavigate();
    const navigateBackToHome = () => {
        navigate('/');  // Navigate to the start-wager page
    }

    return (
        <button 
            onClick={navigateBackToHome}
            className="text-black text-center text-2xl font-extrabold tracking-tight self-center whitespace-nowrap bg-pink-300 self-stretch mt-5 px-5 py-6 rounded-[200px]"
            
            >
            NOTIFY OTHER PLAYER
        </button>

    );
}

function StartAnotherGameSection() {
    const navigate = useNavigate();
    const navigateBackToNewGame = () => {
        navigate('/new-game');  // Navigate to the start-wager page
    }

    return (
        <button 
            onClick={navigateBackToNewGame}
            className="text-black text-center text-2xl font-extrabold tracking-tight self-center whitespace-nowrap bg-yellow-300 self-stretch mt-5 px-5 py-6 rounded-[200px]"
            
            >
            START ANOTHER GAME
        </button>

    );
}

function TakeHomeSection() {
    const navigate = useNavigate();
    return (
        <a 
        href="/"
        onClick={() => navigate('/')}
        className="text-zinc-500 text-base font-extrabold self-center mt-7 whitespace-nowrap">
            TAKE ME BACK HOME
        </a>
    );
}



function GameStarted() {

    return (
        <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
                <GameInfo />
                <NotifyOtherPlayerSection />
                <StartAnotherGameSection />
                <TakeHomeSection />
            </div>
        </main>
    );
}

export default GameStarted;