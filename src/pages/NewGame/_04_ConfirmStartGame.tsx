/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import { Step, useNewGameStore } from './store';
import { useAccount } from '@puzzlehq/sdk';

function ConfirmStartGame() {

  const [answer, wager, opponent, multisig, setStep, setMultisig, setEventId] = useNewGameStore((state) => [state.answer, state.wager, state.opponent, state.multisig, state.setStep, state.setMultisig, state.setEventId])

  const player_account = useAccount().account.address;

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
    setMultisig(result.gameMultisig);
    setSeed(result.seed);
  }, [opponent, player_account]);

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
    setEventId(result);
  };

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wager} />
      {answer && <div className='flex flex-col gap-2'>
        <SelectedAlexLocation answer={answer} win={undefined} />
        <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          You chose to hide Alex {answer}!
        </div>
      </div>}
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col gap-4'>
        {answer && multisig &&
          <Button
            onClick={() =>
              proposeGame(
                opponent,
                player_account,
                multisig,
                seed,
                wager,
                answer
              )
            }
            color='green'  
          >
            KICKOFF GAME!
          </Button>
        }
        <Button
          onClick={() => setStep(Step._03_StartWager)}
          color='gray'
        >
          BACK
        </Button>
      </div>
    </main>
  );
}

export default ConfirmStartGame;
