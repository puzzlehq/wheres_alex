import { useLocation } from 'react-router-dom';


// type AcceptGameProps = {
//   challenger: string;
//   wager: number; // in puzzle pieces
// }

const FinishGame = () => {
  const location = useLocation();
  const { challenger, wager } = location.state || {}; // Get the challenger and wager from state

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="p-4 w-full font-extrabold text-3xl text-center bg-[#FFAED5]">
        YOU'VE BEEN CHALLENGED!
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <div className="rounded-full bg-[#FCFCFC] font-semibold text-xs">
          {challenger}
        </div>
        <p className="text-white">is betting you can't find Alex!</p>
      </div>
      <div className="flex flex-col gap-0">
        <div className="bg-[#4EC331] text-xs">
          WAGER
        </div>
        <div className="flex border-[3px] border-[#4EC331] p-1 items-center">
          <p className="text-3xl text-[#4EC331]">
            {wager}
          </p>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-[#4EC331]">
              Puzzle
              </p>
            <p className="text-sm text-[#4EC331]">
              Pieces
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <button className="w-full rounded-full bg-[#4EC331] text-3xl p-1">
          ACCEPT WAGER
        </button>
        <button className="w-full rounded-full bg-[#868686] text-3xl p-1">
          REJECT
        </button>
      </div>
    </div>
  )
}

export default FinishGame