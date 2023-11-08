/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PuzzleAccount from '../../models/account';
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';

function ConfirmStartGame() {
  // const account: PuzzleAccount = {
  //     network: 'aleo',
  //     chainId: '1',
  //     address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
  //     shortenedAddress: '123456'
  // };
  const navigate = useNavigate();
  const location = useLocation();
  const opponent = location.state?.opponent ?? 'N/A';
  const answer = location.state?.answer ?? 'N/A';
  const amount = location.state?.amount ?? 'N/A';
  const player_account = '';
  const [gameMultisig, setGameMultisig] = useState<string>('');
  const [eventID, setEventID] = useState<string>('');
  const [seed, setSeed] = useState<Uint8Array>(new Uint8Array());
  // const { requestCreateEvent, eventId, error, loading } = useRequestCreateEvent({
  //     type: 'Execute',
  //     programId: 'cflip_gm_aleo_testing_123.aleo',
  //     functionId: 'propose_game',
  //     fee: 10000,
  //     inputs: "1",
  // })

  useEffect(() => {
    function generateGameMultisig(
      opponent: string,
      player_account: string
    ): { gameMultisig: string; seed: Uint8Array } {
      // Our logic to generate gameMultisig and seed using hooks to wallet wasm
      return {
        gameMultisig: 'ms_' + opponent + player_account, // example outputs
        seed: new Uint8Array(),
      };
    }
    const result = generateGameMultisig(opponent, player_account);
    setGameMultisig(result.gameMultisig);
    setSeed(result.seed);
  }, [opponent, player_account]);

  useEffect(() => {
    if (eventID) {
      navigate('/game-started', {
        state: { gameMultisig, eventID },
      });
    }
  }, [eventID, navigate, gameMultisig]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const proposeGame = (
    opponent: string,
    player_account: string,
    gameMultisig: string,
    seed: Uint8Array,
    amount: number,
    answer: string
  ) => {
    const result =
      opponent +
      player_account +
      gameMultisig +
      seed.toString() +
      amount.toString() +
      answer;
    // requestCreateEvent()
    setEventID(result);
  };

  const navigateBackToStartWager = () => {
    navigate('/start-wager', {
      state: { opponent, answer, amount },
    }); // Navigate to the start-wager page
  };

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={amount} />
      <div className='flex flex-col gap-2'>
        <SelectedAlexLocation answer={answer} win={undefined} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          You chose to hide Alex {answer}!
        </div>
      </div>
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col gap-4'>
        <Button
          onClick={() =>
            proposeGame(
              opponent,
              player_account,
              gameMultisig,
              seed,
              amount,
              answer
            )
          }
          color='green'  
        >
          KICKOFF GAME!
        </Button>
        <Button
          onClick={navigateBackToStartWager}
          color='gray'
        >
          BACK
        </Button>
      </div>
    </main>
  );
}

export default ConfirmStartGame;
