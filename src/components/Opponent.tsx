
type OpponentProps = {
  opponent: string;
}

function Opponent({ opponent }: OpponentProps) {
  
  // Shorten the opponent string
  const displayOpponent =
      opponent.length > 9
      ? opponent.slice(0, 5) + "..." + opponent.slice(-4)
      : opponent;

  return (
    <div className="text-white text-center text-xs font-bold self-center mt-5 whitespace-nowrap">
      You are challenging
      <div className="border-[color:var(--White,#FCFCFC)] bg-zinc-50 self-center flex w-[155px] max-w-full flex-col mt-1.5 mb-1.5 px-4 py-2 rounded-[200px] border-2 border-solid">
        <div className="text-neutral-900 text-center text-lg font-bold self-center whitespace-nowrap">
          {displayOpponent}
        </div>
      </div>
      to find where you hid Alex!
    </div>
  );
}

export default Opponent