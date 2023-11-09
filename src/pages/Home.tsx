/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import GameState, { NotifyFinish } from '../models/game_states';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TotalWinnings from '../components/TotalWinnings';
import LiveGames from '../components/LiveGames';
import Notifications from '../components/Notifications';

function Home() {
  const gameStates: GameState[] = [
    { multisig: 'aleo1', opponent: 'Alice', wager: 10, action: 'Start' },
    {
      multisig: 'aleo2',
      opponent: 'Bob',
      wager: 20,
      action: 'Finish',
      win: true,
    } as NotifyFinish,
    {
      multisig: 'aleo3',
      opponent: 'Charlie',
      wager: 30,
      action: 'Renege',
    },
    { multisig: 'aleo4', opponent: 'David', wager: 40, action: 'Delete' },
    {
      multisig: 'aleo5',
      opponent: 'Eva',
      blockheight: 10500,
      wager: 50,
      action: 'Claim',
      win: false,
    },
    {
      multisig: 'aleo6',
      opponent: 'Frank',
      blockheight: 105000,
      wager: 60,
      action: 'Claim',
      win: true,
    },
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
        acc[game.opponent] = calculateTimeLeft(game.blockheight);
      }
      return acc;
    },
    {}
  );

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>(
    initialTimeLeft
  );

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
    <div className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex flex-col w-full bg-neutral-900 px-1 gap-4'>
        <TotalWinnings amount={1234567890} />
        <Button
          color='yellow'
          onClick={() => navigate('/new-game')}
        >
          NEW GAME
        </Button>
        <Notifications notifications={notifications} />
        <LiveGames liveGames={liveGames} timeLeft={timeLeft} />
      </div>
      <div className='mt-4 px-4 pb-4 text-center'>
        {' '}
        {/* Adding px-4 back here to maintain padding for the bottom button */}
        <button className='items-center rounded-full bg-orange-500 p-2 text-xs'>
          Past Games
        </button>
      </div>
    </div>
  );
}

export default Home;
