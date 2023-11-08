type AcceptGameProps = {
  challenger: string;
  wager: number; // in puzzle pieces
};

const AcceptGame = ({ challenger, wager }: AcceptGameProps) => {
  return (
    <div className='flex flex-col justify-center gap-4'>
      <div className='w-full bg-[#FFAED5] p-4 text-center text-3xl font-extrabold'>
        YOU'VE BEEN CHALLENGED!
      </div>
      <div className='flex flex-col justify-center gap-1'>
        <div className='rounded-full bg-[#FCFCFC] text-xs font-semibold'>
          {challenger}
        </div>
        <p className='text-white'>is betting you can't find Alex!</p>
      </div>
      <div className='flex flex-col gap-0'>
        <div className='bg-green text-xs'>WAGER</div>
        <div className='flex items-center border-[3px] border-green p-1'>
          <p className='text-3xl text-green'>{wager}</p>
          <div className='flex flex-col gap-0'>
            <p className='text-sm text-green'>Puzzle</p>
            <p className='text-sm text-green'>Pieces</p>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col'>
        <button className='w-full rounded-full bg-green p-1 text-3xl'>
          ACCEPT WAGER
        </button>
        <button className='w-full rounded-full bg-[#868686] p-1 text-3xl'>
          REJECT
        </button>
      </div>
    </div>
  );
};

export default AcceptGame;
