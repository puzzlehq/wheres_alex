function TotalWinnings() {
  return (
    <section className="border-[color:var(--Green,#4EC331)] self-stretch flex flex-col mt-8 pr-2.5 pt-3.5 border-2 border-solid">
      <div className="text-lime-600 text-right text-base font-bold"> 000000000010 <br /> Puzzle Pieces </div>
      <div className="bg-green-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap"> TOTAL WINNINGS </div>
      </div>
    </section>
  );
}

function NewGame() {
  return (
    <section className="bg-yellow-300 self-stretch flex flex-col mt-7 px-5 py-8 rounded-[200px]">
      <h1 className="text-black text-center text-4xl font-extrabold self-center w-full"> NEW GAME </h1>
    </section>
  );
}

function Notifications() {
  return (
    <section className="border-[color:var(--Pink,#FFAED5)] self-stretch flex grow flex-col mt-8 pr-4 pb-6 border-2 border-solid">
      <div className="bg-pink-300 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap"> NOTIFICATIONS </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-4 pl-px self-start">
        <div className="justify-between items-start self-stretch flex gap-5 max-md:justify-center">
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2"> Alice </div>
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold bg-yellow-300 self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24"> START </button>
        </div>
        <div className="justify-between items-start self-stretch flex gap-5 mt-4 max-md:justify-center">
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> Alice </div>
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold bg-yellow-300 self-stretch max-w-full px-5 py-3 rounded-[200px]"> START </button>
        </div>
        <div className="justify-between items-start self-stretch flex gap-5 mt-4 max-md:justify-center">
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> Alice </div>
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> 10 Puzzle </div>
          <div className="bg-zinc-500 flex max-w-full flex-col px-5 py-3 rounded-[200px]">
            <div className="text-black text-left text-xs font-extrabold self-center whitespace-nowrap"> DELETE </div>
          </div>
        </div>
        <div className="justify-between items-start self-stretch flex gap-5 mt-4 max-md:justify-center">
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> Alice </div>
          <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:-ml-px"> 10 Puzzle </div>
          <div className="bg-zinc-500 flex max-w-full flex-col px-5 py-3 rounded-[200px]">
            <div className="text-black text-left text-xs font-extrabold self-center whitespace-nowrap"> DELETE </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveGames() {
  return (
    <section className="border-[color:var(--Red,#F63B3B)] self-stretch flex flex-col mt-7 pr-5 pb-8 border-2 border-solid">
      <div className="bg-red-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap"> LIVE GAMES </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-3.5 self-start">
        <div className="justify-between items-start self-stretch flex gap-1.5 max-md:justify-center">
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto"> Alice </div>
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full pl-5 pr-5 py-3 rounded-[200px] whitespace-nowrap max-md:pl-px max-sm:items-end max-sm:w-[86px] max-sm:ml-auto max-sm:-mr-1"> RENEG </button>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-pink-300 max-w-full px-4 py-3 rounded-[200px] whitespace-nowrap max-sm:items-end max-sm:justify-center max-sm:w-[74px] max-sm:ml-auto max-sm:mr-1"> PING </button>
        </div>
        <div className="justify-between items-start self-stretch flex gap-1.5 mt-4 max-md:justify-center">
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto"> Alice </div>
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full pl-5 pr-5 py-3 rounded-[200px] whitespace-nowrap max-md:pl-px"> RENEG </button>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-pink-300 max-w-full px-4 py-3 rounded-[200px] whitespace-nowrap"> PING </button>
        </div>
        <div className="justify-between items-start self-stretch flex gap-1.5 mt-4 max-md:justify-center">
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto"> Alice </div>
          <div className="text-red-500 text-left text-xs font-bold self-center my-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full pl-5 pr-5 py-3 rounded-[200px] whitespace-nowrap max-md:pl-px"> RENEG </button>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-pink-300 max-w-full px-4 py-3 rounded-[200px] whitespace-nowrap"> PING </button>
        </div>
      </div>
    </section>
  );
}

function PastGames() {
  return (
    <section className="border-[color:var(--Grey,#868686)] self-stretch flex flex-col mt-8 mb-9 pr-5 pb-5 border-2 border-solid">
      <div className="bg-zinc-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center"> PAST GAMES </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-3.5 self-start">
        <div className="justify-between items-start self-stretch flex w-full gap-5 max-md:justify-center">
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto"> Alice </div>
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full px-5 py-3 rounded-[200px] whitespace-nowrap max-sm:w-[78px]"> WON </button>
        </div>
        <div className="justify-between items-start self-stretch flex w-full gap-5 mt-4 max-md:justify-center">
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> Alice </div>
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full pl-5 pr-5 py-3 rounded-[200px] whitespace-nowrap"> LOST </button>
        </div>
        <div className="justify-between items-start self-stretch flex w-full gap-5 mt-4 max-md:justify-center">
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> Alice </div>
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full px-4 py-3 rounded-[200px]"> DRAW </button>
        </div>
        <div className="justify-between items-start self-stretch flex w-full gap-5 mt-4 max-md:justify-center">
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> Alice </div>
          <div className="text-zinc-500 text-left text-xs font-bold self-center my-auto"> 10 Puzzle </div>
          <button className="text-black text-left text-xs font-extrabold self-stretch bg-zinc-500 max-w-full px-2.5 py-3 rounded-[200px] whitespace-nowrap"> CANCELED </button>
        </div>
      </div>
    </section>
  );
}

function PendingConfirmStartGame() {
  return (
    <main className="bg-neutral-900 flex flex-col pl-5 pr-5">
      <section className="bg-neutral-900 self-stretch flex flex-col mt-8 pl-1">
        <TotalWinnings />
        <NewGame />
        <Notifications />
        <LiveGames />
        <PastGames />
      </section>
    </main>
  );
}

export default PendingConfirmStartGame;