type VersusProps = {
  versus: string;
  isChallenger?: boolean;
};

function Versus({ versus, isChallenger = true }: VersusProps) {
  // Shorten the opponent string
  const displayOpponent =
    versus.length > 9 ? versus.slice(0, 5) + '...' + versus.slice(-4) : versus;

  return (
    <div className='mt-5 self-center whitespace-nowrap text-center text-xs font-bold text-primary-white'>
      {isChallenger && 'You are challenging'}
      <div className='mb-1.5 mt-1.5 flex w-[155px] max-w-full flex-col self-center rounded-[200px] border-2 border-solid border-[color:var(--White,#FCFCFC)] bg-zinc-50 px-4 py-2'>
        <div className='self-center whitespace-nowrap text-center text-lg font-bold text-neutral-900'>
          {displayOpponent}
        </div>
      </div>
      {!isChallenger && 'is challenging you'}
      to find where you hid Alex!
    </div>
  );
}

export default Versus;
