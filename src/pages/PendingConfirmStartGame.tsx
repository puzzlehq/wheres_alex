/* eslint-disable @typescript-eslint/no-explicit-any */
import alexHeadImg from '../assets/alex_head.png';
  
function GameInfo() {
    return (
        <section className="items-center self-stretch flex grow flex-col mt-36 max-md:mt-10">
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
            GAME ID: ALEO1...TUVR6
            </p>
            <a
            href="/confirmation"
            className="text-black text-center text-base font-extrabold leading-4 underline self-center max-w-[295px] mt-1.5"
            >
            View Confirmation
            </a>
        </div>
        </section>
    );
}

function NotifyOtherPlayerSection() {
    return (
        <section className="bg-pink-300 self-stretch flex w-full flex-col mt-24 px-5 py-6 rounded-[200px] max-md:mt-10">
        <h2 className="text-black text-center text-2xl font-extrabold tracking-tight self-center whitespace-nowrap">
            NOTIFY OTHER PLAYER
        </h2>
        </section>
    );
}

function StartAnotherGameSection() {
    return (
        <section className="bg-yellow-300 self-stretch flex w-full flex-col mt-5 px-5 py-6 rounded-[200px]">
        <h2 className="text-black text-center text-2xl font-extrabold tracking-tight self-center whitespace-nowrap">
            START ANOTHER GAME
        </h2>
        </section>
    );
}

function TakeHomeSection() {
    return (
        <p className="text-zinc-500 text-base font-extrabold self-center mt-7 whitespace-nowrap">
            TAKE ME BACK HOME
        </p>
    );
}



function PendingConfirmStartGame() {

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

export default PendingConfirmStartGame;