import { useNavigate } from 'react-router-dom';
import GameState from '../state/game_states';
import { useRenegeStore } from '../pages/Renege/store';
import Button from './Button';

type LiveGameProps = {
  game: GameState;
  timeLeft: { [key: string]: any };
};

function LiveGameItem({ game, timeLeft }: LiveGameProps) {
  const navigate = useNavigate(); // Hook to navigate
  const [initializeRenege] = useRenegeStore((state) => [state.initialize]);

  const handleRenegeClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    initializeRenege(game.player, Number(game.wager));
    navigate('/renege-game');
  };

  const renderActionButton = () => {
    switch (game.action) {
      case 'Claim':
        // Assuming 'Claim' needs a special button not shown in this snippet
        // This is just an example
        return (
          <div className='flex gap-2'>
            <div
              className='text-primary-white text-primary-black flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] px-5 py-3 text-xs font-extrabold tabular-nums max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              {timeLeft[game.player] &&
                `${String(timeLeft[game.player].hours).padStart(
                  2,
                  '0'
                )}:${String(timeLeft[game.player].minutes).padStart(
                  2,
                  '0'
                )}:${String(timeLeft[game.player].seconds).padStart(2, '0')}`}
            </div>
          </div>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <div className='flex gap-2'>
            <Button onClick={handleRenegeClick} variant='red' size='md'>
              {game.action}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold'>
        {game.player}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold'>
        {game.wager} pieces
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
    <section className='flex grow flex-col self-stretch rounded-b-[5px] border-2 border-solid border-bg2 bg-bg1 pb-6'>
      <div className='flex max-w-full flex-col self-start bg-bg2 px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3'>
          THEIR TURN
        </div>
      </div>
      <div className='flex flex-col px-5 pt-2'>
        {liveGames.map((game) => (
          <LiveGameItem key={game.player} game={game} timeLeft={timeLeft} />
        ))}
      </div>
    </section>
  );
}

export default LiveGames;
