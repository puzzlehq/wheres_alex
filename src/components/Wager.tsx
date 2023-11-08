type WagerProps = {
  wagerAmount: number;
  winnings?: boolean;
};

const Wager = ({ wagerAmount, winnings = false }: WagerProps) => {
  return (
    <div className='w-fit self-center'>
      <div className='flex w-full flex-col items-center gap-0'>
        <div className='w-full bg-[#4EC331] text-center text-lg font-extrabold text-black'>
          {winnings ? 'WINNINGS' : 'WAGER'}
        </div>
        <div className='flex w-full items-center gap-2 border-[3px] border-[#4EC331] p-1'>
          <p className='flex-1 text-3xl font-bold text-[#4EC331]'>
            {wagerAmount}
          </p>
          <div className='flex flex-col gap-0'>
            <p className='flex-1 text-base font-bold leading-[16px] text-[#4EC331]'>
              Puzzle
            </p>
            <p className='flex-1 text-base font-bold text-[#4EC331]'>Pieces</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wager;
