import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Wager from "../components/Wager";
import PageHeader from '../components/PageHeader';
import Opponent from '../components/Opponent';

const AcceptGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryAmount = Number(location.state?.amount);
  const amount = isNaN(queryAmount) ? 0 : queryAmount;
  const opponent = location.state?.opponent ?? "N/A";
  const gameMultisig = location.state?.gameMultisig ?? "N/A";
  const answer = location.state?.answer ?? "N/A";

  const [eventID, setEventID] = useState<string>("");

  useEffect(() => {
    if (eventID) {
        navigate("/find-alex", {
            state: { gameMultisig, eventID, opponent, amount }
        });
    }
}, [eventID, gameMultisig, opponent, amount]);

  const acceptGame = () => {
    // TODO: Replace with logic to call function on smart contract with player's keypair
    const result = gameMultisig + amount.toString();
    // requestCreateEvent here to get actual eventID
    setEventID(result);
  }

  const rejectGame = () => {
      // Navigate to the start-wager page
      navigate('/home', {
          state: {opponent, answer, amount}
      }); 
  }

  return (
    <main className="h-full w-full flex flex-col justify-between bg-neutral-900 gap-8">
      <PageHeader bg='bg-pink-300' text={`YOU'VE BEEN CHALLENGED!`}/>
      <Opponent opponent={opponent} />
      <Wager wagerAmount={amount} />
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col w-full gap-4'>
        <button
          onClick={acceptGame}
          className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
                      bg-[#4EC331] w-full p-5 rounded-[200px] max-md:ml-px`}
        >
          ACCEPT WAGER
        </button>
        <button
          onClick={rejectGame}
          className={`text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap
              bg-[#868686] w-full p-5 rounded-[200px] max-md:ml-px`}
          >
            REJECT
        </button>
      </div>
    </main>
  )
}

export default AcceptGame