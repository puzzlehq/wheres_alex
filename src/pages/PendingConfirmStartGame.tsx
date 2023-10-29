import { useNavigate } from 'react-router-dom';

function TotalWinnings() {
  return (
    <section className="border-[color:var(--Green,#4EC331)] self-stretch flex flex-col mt-1 pr-2.5 pt-1 border-2 border-solid">
      <div className="text-lime-600 text-right text-base font-bold">
        000000000010 <br /> Puzzle Pieces
      </div>
      <div className="bg-green-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
          TOTAL WINNINGS
        </div>
      </div>
    </section>
  );
}

function NewGame() {
    const navigate = useNavigate();  // Get the history object

    const navigateToNewGame = () => {
        navigate('/new-game');  // Navigate to the NewGame page
    }
    return (
        <button
          onClick={navigateToNewGame}
          className="bg-yellow-300 flex justify-center items-center mt-7 px-5 py-8 rounded-[200px] text-black text-4xl font-extrabold w-full hover:bg-yellow-400"
        >
          NEW GAME
        </button>
    );
}

function NotificationItem({ name, puzzle }) {
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center w-full mb-2">
      <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2">
        {name}
      </div>
      <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2">
        {puzzle} Puzzle
      </div>
      <div className="flex justify-end">
        <button 
            className="text-black text-center text-xs font-extrabold bg-yellow-300 self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24"
            style={{ maxWidth: '100px' }}
        >
            START
        </button>
      </div>
    </div>
  );
}

function Notifications() {
  const notifications = [
    { name: "Alice", puzzle: 10 },
    { name: "Bob", puzzle: 5 },
    { name: "Charlie", puzzle: 3 },
  ];

  return (
    <section className="border-[color:var(--Pink,#FFAED5)] self-stretch flex grow flex-col mt-8 pr-4 pb-6 border-2 border-solid">
      <div className="bg-pink-300 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
          NOTIFICATIONS
        </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-4 pl-px self-start">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            name={notification.name}
            puzzle={notification.puzzle}
          />
        ))}
      </div>
    </section>
  );
}

function LiveGameItem({ name, puzzle }) {
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center w-full mb-2">
      <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto">
        {name}
      </div>
      <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto">
        {puzzle} Puzzle
      </div>
      <div className="flex justify-end">
        <button 
            className="text-black text-center text-xs font-extrabold self-stretch bg-zinc-500 max-w-full pl-5 pr-5 py-3 rounded-[200px] whitespace-nowrap max-md:pl-px max-sm:items-end max-sm:w-[86px] max-sm:ml-auto max-sm:-mr-1 mr-2"
            style={{ minWidth: '80px' }}
        >
            RENEG
        </button>
        <button 
            className="text-black text-center text-xs font-extrabold self-stretch bg-pink-300 max-w-full px-4 py-3 rounded-[200px] whitespace-nowrap max-sm:items-end max-sm:justify-center max-sm:w-[74px] max-sm:ml-auto max-sm:mr-1"
            style={{ minWidth: '80px' }}
        >
            PING
        </button>
      </div>
    </div>
  );
}

function LiveGames() {
  const liveGames = [
    { name: "Alice", puzzle: 10 },
    { name: "Bob", puzzle: 5 },
    { name: "Charlie", puzzle: 3 },
  ];

  return (
    <section className="border-[color:var(--Red,#F63B3B)] self-stretch flex grow flex-col mt-7 pr-5 pb-8 border-2 border-solid">
      <div className="bg-red-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
          LIVE GAMES
        </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-3.5 self-start">
        {liveGames.map((liveGame, index) => (
          <LiveGameItem
            key={index}
            name={liveGame.name}
            puzzle={liveGame.puzzle}
          />
        ))}
      </div>
    </section>
  );
}

function PastGameItem({ name, puzzle, result }) {
    return (
      <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center w-full mb-2">
        <div className="text-zinc-500 text-left text-xs font-bold self-center">
          {name}
        </div>
        {/* Puzzle is in a fixed column in the middle */}
        <div className="text-zinc-500 text-center text-xs font-bold self-center">
          {puzzle} Puzzle
        </div>
        <div className="flex justify-end">
          <button 
            className="text-black text-center text-xs font-extrabold self-center bg-zinc-500 px-5 py-3 rounded-[200px] whitespace-nowrap"
            style={{ minWidth: '125px' }}
          >
            {result}
          </button>
        </div>
      </div>
    );
  }

function PastGames() {
  const pastGames = [
    { name: "Alice", puzzle: 10, result: "WON" },
    { name: "Bob", puzzle: 5, result: "LOST" },
    { name: "Charlie", puzzle: 3, result: "DRAW" },
    { name: "Dave", puzzle: 7, result: "CANCELED" },
  ];

  return (
    <section className="border-[color:var(--Grey,#868686)] self-stretch flex grow flex-col mt-8 mb-9 pr-5 pb-5 border-2 border-solid">
      <div className="bg-zinc-500 flex max-w-full flex-col px-5 py-2 self-start">
        <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center">
          PAST GAMES
        </div>
      </div>
      <div className="items-start self-stretch flex grow flex-col ml-5 mt-3.5 self-start">
        {pastGames.map((pastGame, index) => (
          <PastGameItem
            key={index}
            name={pastGame.name}
            puzzle={pastGame.puzzle}
            result={pastGame.result}
          />
        ))}
      </div>
    </section>
  );
}

function PendingConfirmStartGame() {
  return (
    <main className="bg-neutral-900 flex flex-col pl-5 pr-5">
      <section className="bg-neutral-900 self-stretch flex flex-col mt-1 pl-1">
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