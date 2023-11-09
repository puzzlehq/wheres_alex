/* eslint-disable @typescript-eslint/no-explicit-any */
import Opponent from '../../components/Opponent';
import PageHeader from '../../components/PageHeader';
import Wager from '../../components/Wager';
import SelectedAlexLocation from '../../components/SelectedAlexLocation';
import Button from '../../components/Button';
import { Step, useNewGameStore } from './store';

function ConfirmStartGame() {

  const [answer, wager, opponent, multisig, setStep, createGame] = useNewGameStore((state) => [state.answer, state.wager, state.opponent, state.multisig, state.setStep, state.createGame])

  // const { requestCreateEvent, eventId, error, loading } = useRequestCreateEvent({
  //     type: 'Execute',
  //     programId: 'cflip_gm_aleo_testing_123.aleo',
  //     functionId: 'propose_game',
  //     fee: 10000,
  //     inputs: "1",
  // })

  return (
    <main className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-pink' text='REVIEW AND KICKOFF GAME' />
      <Opponent opponent={opponent} />
      <Wager wagerAmount={wager} />
      {answer &&
        <div className='flex flex-col gap-2'>
          <SelectedAlexLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide Alex {answer}!
          </div>
        </div>
      }
      <div className='flex flex-col flex-grow'/>
      <div className='flex flex-col gap-4'>
        {answer && multisig &&
          <Button
            onClick={createGame}
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
