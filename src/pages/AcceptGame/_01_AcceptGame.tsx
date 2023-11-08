import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Wager from '../../components/Wager';
import PageHeader from '../../components/PageHeader';
import Opponent from '../../components/Opponent';
import { getNumberAmount } from '../../utils';

const AcceptGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = getNumberAmount(location.state?.amount);
  const opponent = location.state?.opponent ?? 'N/A';
  const gameMultisig = location.state?.gameMultisig ?? 'N/A';
  const answer = location.state?.answer ?? 'N/A';

  const [eventID, setEventID] = useState<string>('');

  useEffect(() => {
    if (eventID) {
      navigate('/find-alex', {
        state: { gameMultisig, eventID, opponent, amount },
      });
    }
  }, [eventID, gameMultisig, opponent, amount]);

  const acceptGame = () => {
    // TODO: Replace with logic to call function on smart contract with player's keypair
    const result = gameMultisig + amount.toString();
    // requestCreateEvent here to get actual eventID
    setEventID(result);
  };

  const rejectGame = () => {
    // Navigate to the start-wager page
    navigate('/home', {
      state: { opponent, answer, amount },
    });
  };

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text={`YOU'VE BEEN CHALLENGED!`} />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={amount} />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-4'>
        <button
          onClick={acceptGame}
          className={`w-full self-center whitespace-nowrap rounded-[200px] bg-primary-green p-5 text-center
                      text-3xl font-extrabold tracking-tight text-primary-black max-md:ml-px`}
        >
          ACCEPT WAGER
        </button>
        <button
          onClick={rejectGame}
          className={`w-full self-center whitespace-nowrap rounded-[200px] bg-[#868686] p-5 text-center
              text-3xl font-extrabold tracking-tight text-primary-black max-md:ml-px`}
        >
          REJECT
        </button>
      </div>
    </main>
  );
};

export default AcceptGame;
