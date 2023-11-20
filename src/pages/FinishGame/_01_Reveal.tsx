import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import SelectedTreasureLocation from "../../components/SelectedTreasureLocation";
import Wager from "../../components/Wager";
import { useFinishGameStore } from "./store"

const Reveal = () => {
  const [wager, answer] = useFinishGameStore((state) => [state.wager, state.answer]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col gap-2 items-center">
        <p className="font-bold">RESULTS ARE IN</p>
        {wager && <Wager wagerAmount={wager}/>}
      </div>
      <PageHeader
        bg="bg-primary-blue"
        text={`WHERE'S THE TREASURE?`}
      />
      {answer &&
        <div className='flex flex-col gap-2'>
          <SelectedTreasureLocation answer={answer} win={undefined} />
          <div className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
            You chose to hide the treasure {answer}!
          </div>
        </div>
      }
      <div className="flex flex-col flex-grow" />
      <Button
        color="green"
        onClick={() => {
          
        }}
      >
        REVEAL RESULTS
      </Button>
    </div>
  )
}

export default Reveal;