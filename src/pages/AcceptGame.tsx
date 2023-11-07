<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
=======
import Wager from "../components/Wager";
>>>>>>> 9104b1eaa5c833c176adc136fe7a9f43523e08d3


// type AcceptGameProps = {
//   challenger: string;
//   wager: number; // in puzzle pieces
// }

function Section() {
  return (
    <section className="justify-center items-center bg-pink-300 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
      <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> YOU'VE BEEN CHALLENGED </h1>
    </section>
  );
}

function OpponentSection() {
  const location = useLocation();
  const opponent = location.state?.opponent || "N/A";

  // Shorten the opponent string
  const displayOpponent =
      opponent.length > 9
      ? opponent.slice(0, 5) + "..." + opponent.slice(-4)
      : opponent;

  return (
<<<<<<< HEAD
    <div className="text-white text-center text-xs font-bold self-center mt-5 whitespace-nowrap">
      You are challenging
      <div className="border-[color:var(--White,#FCFCFC)] bg-zinc-50 self-center flex w-[155px] max-w-full flex-col mt-1.5 mb-1.5 px-5 py-4 rounded-[200px] border-2 border-solid">
        <div className="text-neutral-900 text-center text-xs font-bold self-center whitespace-nowrap">
          {displayOpponent}
        </div>
      </div>
      to find where you hid Alex!
    </div>
  );
}

function WagerSection() {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div className="border-[color:var(--Green,#4EC331)] self-center flex w-[149px] max-w-full flex-col mt-9 pb-3.5 border-[3px] border-solid">
      <div className="text-neutral-900 text-center text-xs font-extrabold leading-3 bg-lime-600 self-stretch w-full px-5 py-2">
        WAGER
      </div>
      <div className="self-center flex w-[121px] max-w-full items-start gap-2.5 mt-2.5">
        <div className="text-lime-600 text-center text-3xl font-bold self-center my-auto">
          {amount}
        </div>
        <div className="text-lime-600 text-center text-base font-bold leading-4 self-stretch">
          Puzzle Pieces
        </div>
=======
    <div className="flex flex-col gap-4 justify-center h-full w-full">
      <div className="p-4 w-full font-extrabold text-5xl text-center bg-[#FFAED5] text-black">
        YOU'VE BEEN CHALLENGED!
      </div>
      <div className="flex flex-col gap-1 items-center">
        <div className="rounded-full bg-[#FCFCFC] font-bold text-md px-4 py-2 text-black">
          {challenger ?? 'Jonathan'}
        </div>
        <p className="text-white font-bold">is betting you can't find Alex!</p>
      </div>
      <Wager wagerAmount={wager ?? 5000}/>
      <div className="flex flex-col flex-grow"/>
      <div className="flex flex-col w-full gap-2">
        <button className="w-full rounded-full bg-[#4EC331] text-4xl font-extrabold p-3 text-black">
          ACCEPT WAGER
        </button>
        <button className="w-full rounded-full bg-[#868686] text-4xl font-extrabold p-3 text-black">
          REJECT
        </button>
>>>>>>> 9104b1eaa5c833c176adc136fe7a9f43523e08d3
      </div>
    </div>
  );
}

function AcceptWager() {
  const navigate = useNavigate();
  const location = useLocation();
  const opponent = location.state?.opponent || "N/A";
  const amount = location.state?.amount || 0;
  const gameMultisig = location.state?.gameMultisig || "N/A";
  const [eventID, setEventID] = useState<string>("");

  useEffect(() => {
    if (eventID) {
        navigate("/find-alex", {
            state: { gameMultisig, eventID, opponent, amount }
        });
    }
}, [eventID, navigate, gameMultisig, opponent, amount]);

  function acceptGame(gameMultisig: string, amount: number) {
    // TODO: Replace with logic to call function on smart contract with player's keypair
    const result = gameMultisig + amount.toString();
    // requestCreateEvent here to get actual eventID
    setEventID(result);
  }
  return (
    <button
        onClick={() => acceptGame(
            gameMultisig,
            amount
        )}
        className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
                    bg-lime-600 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
    >
        ACCEPT WAGER
    </button>
  );
}

// TODO -- finish reject button by actually sending rejection to counter party
function RejectButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const opponent = location.state?.opponent || "N/A";
  const answer = location.state?.answer || "N/A";
  const amount = location.state?.amount || "N/A";

  const navigateBackToStartWager = () => {
      navigate('/home', {
          state: {opponent, answer, amount}
      });  // Navigate to the start-wager page
  }
  return (
      <button
          onClick={navigateBackToStartWager}
          className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
              bg-zinc-500 self-stretch w-full mt-4 p-5 rounded-[200px] max-md:ml-px max-md:mt-10`}
          >
          REJECT
      </button>
  );
}




const AcceptGame = () => {
  return (
    <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
      <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
        <Section />
        <OpponentSection />
        <WagerSection />
        <AcceptWager />
        <RejectButton />
      </div>
    </main>
  )
}

export default AcceptGame