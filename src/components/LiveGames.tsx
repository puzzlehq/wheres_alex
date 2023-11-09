import { useNavigate } from "react-router-dom";
import GameState from "../models/game_states";

type LiveGameProps = {
  game: GameState;
  timeLeft: { [key: string]: any };
};

function LiveGameItem({ game, timeLeft }: LiveGameProps) {
  const navigate = useNavigate(); // Hook to navigate

  const handleRenegeClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/Renege-unaccepted-game', {
      state: {
        multisig: game.multisig,
        opponent: game.opponent,
        amount: game.wager,
      },
    });
  };

  // Function to handle the ping button click
  const handlePingClick = () => {
    // You might want to replace 'ENTER_PHONE_NUMBER' with the actual number if needed
    const phoneNumber = 'ENTER_PHONE_NUMBER'; // Leave this as is if you want the user to enter the number.
    const message = `I'm betting you ${game.wager} that you can't find where I hid Alex! Click here to download Puzzle Wallet https://puzzle.online to play!`;
    const encodedMessage = encodeURIComponent(message);
    const smsHref = `sms:${phoneNumber}?&body=${encodedMessage}`;

    window.location.href = smsHref;
  };

  const renderActionButton = () => {
    switch (game.action) {
      case 'Claim':
        // Assuming 'Claim' needs a special button not shown in this snippet
        // This is just an example
        return (
          <div className="flex gap-2">
            <div
              className='flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-gray px-5 py-3 text-xs font-extrabold tabular-nums text-primary-black max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              {timeLeft[game.opponent] &&
                `${String(timeLeft[game.opponent].hours).padStart(
                  2,
                  '0'
                )}:${String(timeLeft[game.opponent].minutes).padStart(
                  2,
                  '0'
                )}:${String(timeLeft[game.opponent].seconds).padStart(2, '0')}`}
            </div>
            <a
              href='#'
              onClick={handlePingClick}
              className='flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-pink px-5 py-3 text-xs font-extrabold text-primary-black max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              PING
            </a>
          </div>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <div className="flex gap-2">
            <button
              onClick={handleRenegeClick}
              className='flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-gray px-5 py-3 text-xs font-extrabold text-primary-black max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              {game.action}
            </button>
            <a
              href='#'
              onClick={handlePingClick}
              className='flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-pink px-5 py-3 text-xs font-extrabold text-primary-black max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              PING
            </a>
          </div>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red'>
        {game.opponent}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red'>
        {game.wager}
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

type LiveGamesProps = {
  liveGames: GameState[];
  timeLeft: { [key: string]: any };
};

function LiveGames({ liveGames, timeLeft }: LiveGamesProps) {
  return (
    <section className='flex grow flex-col self-stretch border-2 border-solid border-primary-red pb-6'>
      <div className='flex max-w-full flex-col self-start bg-primary-red px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          LIVE GAMES
        </div>
      </div>
      <div className='px-5 pt-2 flex flex-col'>
        {liveGames.map((game) => (
          <LiveGameItem key={game.opponent} game={game} timeLeft={timeLeft} />
        ))}
      </div>
    </section>
  );
}

export default LiveGames;