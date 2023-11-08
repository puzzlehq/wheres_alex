/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import GameState, { NotifyFinish } from '../models/game_states';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function TotalWinnings() {
  return (
    <section className='mt-8 flex flex-col self-stretch border-2 border-solid border-[color:var(--primary-green,#4EC331)] px-2.5 pt-3.5 text-primary-green'>
      <div
        className='overflow-hidden text-right text-4xl font-bold tabular-nums'
        style={{ direction: 'rtl' }}
      >
        0000000001234567898765432
      </div>
      <div className='flex w-full'>
        <div className='-ml-2.5 flex max-w-full flex-col self-start bg-primary-green px-5 py-2'>
          <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
            TOTAL WINNINGS
          </div>
        </div>
        <div className='flex flex-grow' />
        <p className='font-bold'>Puzzle Pieces</p>
      </div>
    </section>
  );
}

function NewGame() {
  const navigate = useNavigate(); // Get the history object

  const navigateToNewGame = () => {
    navigate('/new-game'); // Navigate to the NewGame page
  };
  return (
    <Button
      color='yellow'
      onClick={navigateToNewGame}
    >
      NEW GAME
    </Button>
  );
}

type NotificationProps = {
  notification: GameState;
};

function NotificationItem({ notification }: NotificationProps) {
  const navigate = useNavigate(); // Hook to navigate

  const handleStartClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/accept-game', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
      },
    });
  };

  const handleFinishClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/finish-game', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
        win: true,
      },
    });
  };

  const handleFinishClaimClick = () => {
    // Navigate to accept-game and pass the challenger and wager as state
    navigate('/finish-game-claim', {
      state: {
        gameMultisig: notification.gameMultisig,
        opponent: notification.player,
        amount: notification.wager,
      },
    });
  };

  const renderActionButton = () => {
    switch (notification.action) {
      case 'Start':
        return (
          <button
            onClick={handleStartClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:ml-24'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      case 'Finish':
        return (
          <button
            onClick={handleFinishClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:ml-24'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      case 'Claim':
        return (
          <button
            onClick={handleFinishClaimClick}
            className='max-w-full self-stretch rounded-[200px] bg-primary-yellow px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:ml-24'
            style={{ minWidth: '100px' }}
          >
            {notification.action}
          </button>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <button
              className={`max-w-full self-stretch rounded-[200px] px-5 py-3 text-center text-xs font-extrabold text-primary-black max-sm:ml-24 ${
                notification.action === 'Delete' ? 'bg-primary-gray' : 'bg-primary-yellow'
              }`}
              style={{ minWidth: '100px' }}
            >
              {notification.action}
            </button>
          </>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {notification.player}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2'>
        {notification.wager}
      </div>
      <div className='flex justify-end'>{renderActionButton()}</div>
    </div>
  );
}

type NotificationsProps = {
  notifications: GameState[];
};

function Notifications({ notifications }: NotificationsProps) {
  return (
    <section className='mt-8 flex grow flex-col self-stretch border-2 border-solid border-primary-pink pb-6 pr-4'>
      <div className='flex max-w-full flex-col self-start bg-primary-pink px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          NOTIFICATIONS
        </div>
      </div>
      <div className='ml-5 mt-4 flex grow flex-col items-start self-stretch pl-px'>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.player}
            notification={notification}
          />
        ))}
      </div>
    </section>
  );
}

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
        gameMultisig: game.gameMultisig,
        opponent: game.player,
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
          <>
            <div
              className='mr-2 flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-gray px-5 py-3 text-xs font-extrabold tabular-nums text-primary-black max-sm:w-[78px]'
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
            <a
              href='#'
              onClick={handlePingClick}
              className='flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-pink px-5 py-3 text-xs font-extrabold text-primary-black max-sm:w-[78px]'
              style={{ minWidth: '100px' }}
            >
              PING
            </a>
          </>
        );
      default:
        // The 'else' part for '... other buttons'
        return (
          <>
            <button
              onClick={handleRenegeClick}
              className='mr-2 flex w-[fit-content] items-center justify-center whitespace-nowrap rounded-[200px] bg-primary-gray px-5 py-3 text-xs font-extrabold text-primary-black max-sm:w-[78px]'
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
          </>
        );
    }
  };

  return (
    <div className='mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5'>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red max-sm:mr-auto'>
        {game.player}
      </div>
      <div className='my-auto self-center text-left text-xs font-bold text-primary-red max-sm:mr-auto'>
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
    <section className='mt-7 flex grow flex-col self-stretch border-2 border-solid border-primary-red pb-8 pr-5'>
      <div className='flex max-w-full flex-col self-start bg-primary-red px-5 py-2'>
        <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
          LIVE GAMES
        </div>
      </div>
      <div className='ml-5 mt-3.5 flex grow flex-col items-start self-start self-stretch'>
        {liveGames.map((game) => (
          <LiveGameItem key={game.player} game={game} timeLeft={timeLeft} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const gameStates: GameState[] = [
    { gameMultisig: 'aleo1', player: 'Alice', wager: '10 P', action: 'Start' },
    {
      gameMultisig: 'aleo2',
      player: 'Bob',
      wager: '20 P',
      action: 'Finish',
      win: true,
    } as NotifyFinish,
    {
      gameMultisig: 'aleo3',
      player: 'Charlie',
      wager: '30 P',
      action: 'Renege',
    },
    { gameMultisig: 'aleo4', player: 'David', wager: '40 P', action: 'Delete' },
    {
      gameMultisig: 'aleo5',
      player: 'Eva',
      blockheight: 10500,
      wager: '50 P',
      action: 'Claim',
      win: false,
    },
    {
      gameMultisig: 'aleo6',
      player: 'Frank',
      blockheight: 105000,
      wager: '60 P',
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
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime: { [key: string]: any } = {};

        // eslint-disable-next-line prefer-const
        for (let player in prevTime) {
          let { hours, minutes, seconds } = prevTime[player];

          if (seconds < 59) seconds++;
          else if (minutes < 59) {
            minutes++;
            seconds = 0;
          } else {
            hours++;
            minutes = 0;
            seconds = 0;
          }

          newTime[player] = { hours, minutes, seconds };
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='w-full bg-neutral-900 px-1'>
        <TotalWinnings />
        <NewGame />
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
