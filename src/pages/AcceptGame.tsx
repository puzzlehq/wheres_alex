import Wager from "../components/Wager";

type AcceptGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
}

const AcceptGame = ({ challenger, wager }: AcceptGameProps) => {
  return (
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
      </div>
    </div>
  )
}

export default AcceptGame