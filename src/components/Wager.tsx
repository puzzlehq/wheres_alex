type WagerProps = {
  wagerAmount: number;
  winnings?: boolean;
};

const Wager = ({ wagerAmount, winnings = false }: WagerProps) => {
  return (
    <div className='w-fit self-center bg-bg1'>
      <div className='flex w-full flex-col items-center gap-0'>
        <div className='text-primary-black w-full bg-bg2 text-center text-lg font-extrabold'>
          {winnings ? 'WINNINGS' : 'WAGER'}
        </div>
        <div className='flex w-full items-center gap-2 border-[3px] border-bg2 p-1'>
          <p className='flex-1 text-3xl font-bold text-primary'>
            {wagerAmount}
          </p>
          <div className='flex flex-col gap-0'>
            <p className='flex-1 text-base font-bold leading-[16px] text-primary'>
              Puzzle
            </p>
            <p className='flex-1 text-base font-bold text-primary'>Pieces</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wager;
