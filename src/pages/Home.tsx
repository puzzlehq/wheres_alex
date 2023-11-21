/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import GameState from '../state/game_states';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TotalWinnings from '../components/TotalWinnings';
import LiveGames from '../components/TheirTurn';
import Notifications from '../components/YourTurn';
import { usePieces } from '../state/usePieces';

function Home() {
  const { totalBalance } = usePieces();

  const gameStates: GameState[] = [
    { gameMultisig: 'aleo1', player: 'Alice', wager: '10', action: 'Start' },
  ];

  const aleo_blockheight: number = 50000;
  const aleo_blocks_per_hr: number = 6055;

  const liveGames = gameStates.filter(
    (game) =>
      game.action === 'Renege' ||
      (game.action === 'Claim' && game.blockheight <= aleo_blockheight)
  );
  const notifications = gameStates.filter(
    (game) =>
      ['Start', 'Finish', 'Delete'].includes(game.action) ||
      (game.action === 'Claim' && game.blockheight > aleo_blockheight)
  );

  // Timer logic
  const calculateTimeLeft = (blockheight: number) => {
    const hoursLeft = (blockheight - aleo_blockheight) / aleo_blocks_per_hr;
    return {
      hours: Math.floor(hoursLeft),
      minutes: Math.floor((hoursLeft % 1) * 60),
      seconds: Math.floor((((hoursLeft % 1) * 60) % 1) * 60),
    };
  };

  const initialTimeLeft = liveGames.reduce<{ [key: string]: any }>(
    (acc, game) => {
      if (game.action === 'Claim') {
        acc[game.player] = calculateTimeLeft(game.blockheight);
      }
      return acc;
    },
    {}
  );

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>(
    initialTimeLeft
  );

  useEffect(() => {
    navigate('/accept-game')
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime: { [key: string]: any } = {};

        // eslint-disable-next-line prefer-const
        for (let opponent in prevTime) {
          let { hours, minutes, seconds } = prevTime[opponent];

          if (seconds < 59) seconds++;
          else if (minutes < 59) {
            minutes++;
            seconds = 0;
          } else {
            hours++;
            minutes = 0;
            seconds = 0;
          }

          newTime[opponent] = { hours, minutes, seconds };
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <div className='flex h-full flex-col justify-between '>
      <div className='flex w-full flex-col gap-4 px-1'>
        <TotalWinnings amount={totalBalance} />
        <Button
          variant='primary'
          size='lg'
          onClick={() => navigate('/new-game')}
          className='w-fit self-center'
        >
          NEW GAME
        </Button>
        <Notifications notifications={notifications} />
        <LiveGames liveGames={liveGames} timeLeft={timeLeft} />
      </div>
      <div className='mt-4 px-4 pb-4 text-center'>
        {' '}
        {/* Adding px-4 back here to maintain padding for the bottom button */}
        <Button variant='gray' size='md'>
          Past Games
        </Button>
      </div>
    </div>
  );
}

export default Home;
