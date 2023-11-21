type OpponentProps = {
  opponent: string;
};

function Opponent({ opponent }: OpponentProps) {
  // Shorten the opponent string
  const displayOpponent =
    opponent.length > 9
      ? opponent.slice(0, 5) + '...' + opponent.slice(-4)
      : opponent;

  return (
    <div className='flex w-full flex-col justify-center gap-1 whitespace-nowrap text-center text-xs font-bold text-white'>
      You are challenging
      <div className='w-[155px] max-w-full self-center whitespace-nowrap rounded-[200px] border-2 border-solid border-[color:var(--White,#FCFCFC)] bg-zinc-50 px-4 py-2 text-center text-lg font-bold text-bg2'>
        {displayOpponent}
      </div>
      to find where you hid the treasure!
    </div>
  );
}

export default Opponent;
