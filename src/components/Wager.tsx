type WagerProps = {
  wagerAmount: number;
  winnings?: boolean;
};

const Wager = ({ wagerAmount, winnings = false }: WagerProps) => {
  return (
    <div className='w-fit self-center'>
      <div className='flex w-full flex-col items-center gap-0'>
        <div className='w-full bg-primary-green text-center text-lg font-extrabold text-primary-black'>
          {winnings ? 'WINNINGS' : 'WAGER'}
        </div>
        <div className='flex w-full items-center gap-2 border-[3px] border-primary-green p-1'>
          <p className='flex-1 text-3xl font-bold text-primary-green'>
            {wagerAmount}
          </p>
          <div className='flex flex-col gap-0'>
            <p className='flex-1 text-base font-bold leading-[16px] text-primary-green'>
              Puzzle
            </p>
            <p className='flex-1 text-base font-bold text-primary-green'>
              Prudens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wager;
