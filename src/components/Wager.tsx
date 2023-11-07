type WagerProps = {
  wagerAmount: number,
  winnings?: boolean
}

const Wager = ({ wagerAmount, winnings = false }: WagerProps) => {
  return (
    <div className="w-fit self-center">
      <div className="flex flex-col gap-0 w-full items-center">
        <div className="w-full bg-[#4EC331] text-lg font-extrabold text-black text-center">
          {winnings ? 'WINNINGS' : 'WAGER'}
        </div>
        <div className="w-full border-[3px] border-[#4EC331] p-1 gap-2 items-center flex">
          <p className="text-3xl text-[#4EC331] font-bold flex-1">
            {wagerAmount}
          </p>
          <div className="flex-col gap-0 flex">
            <p className="text-base leading-[16px] text-[#4EC331] font-bold flex-1">
              Puzzle
            </p>
            <p className="text-base text-[#4EC331] font-bold flex-1">
              Pieces
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wager