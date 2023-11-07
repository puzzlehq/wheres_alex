import { useLocation } from 'react-router-dom';
import Wager from '../components/Wager';

const FinishGame = () => {
  const location = useLocation();
  const { challenger, wager } = location.state || {}; // Get the challenger and wager from state

  return (
    <div className="flex flex-col gap-4 justify-center h-full w-full">
    <div className="p-4 w-full font-extrabold text-5xl text-center bg-[#45B1ED] text-black">
      CONGRATS WINNER!
    </div>
    <Wager wagerAmount={wager ?? 5000} winnings/>
    <div className="flex flex-col flex-grow"/>
    <div className="flex flex-col w-full gap-2">
      <button className="w-full rounded-full bg-[#4EC331] text-4xl font-extrabold p-3 text-black">
        ACCEPT WAGER
      </button>
      <button className="w-full rounded-full bg-[#868686] text-4xl font-extrabold p-3 text-black">
        REJECT
      </button>
    </div>
  </div>
  )
}

export default FinishGame