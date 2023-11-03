/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import GameState from '../models/game_states';
import { useNavigate, Route, Routes  } from 'react-router-dom';
import AcceptGame from '../pages/AcceptGame';
import FinishGame from './FinishGame';
import FinishGameClaim from './FinishGameClaim';

<Routes>
  <Route path='/accept-game' element={<AcceptGame />} />
  <Route path='/finish-game' element={<FinishGame />} />
  <Route path='/finish-game-claim' element={<FinishGameClaim />} />
</Routes>

function TotalWinnings() {
    return (
      <section className="border-[color:var(--Green,#4EC331)] self-stretch flex flex-col mt-8 px-2.5 pt-3.5 border-2 border-solid text-[#4EC331]">
        <div className="text-right font-bold text-4xl tabular-nums overflow-hidden" style={{direction:'rtl'}}>
            0000000001234567898765432
        </div>
        <div className='w-full flex'>
            <div className="bg-[#4EC331] flex max-w-full flex-col px-5 -ml-2.5 py-2 self-start">
                <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
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

type NotificationProps = {
    notification: GameState;
};

function NotificationItem({ notification }: NotificationProps) {
    const navigate = useNavigate(); // Hook to navigate

    const handleStartClick = () => {
        // Navigate to accept-game and pass the challenger and wager as state
        navigate('/accept-game', { state: { challenger: notification.player, wager: notification.wager } });
    };

    const handleFinishClick = () => {
        // Navigate to accept-game and pass the challenger and wager as state
        navigate('/finish-game', { state: { challenger: notification.player, wager: notification.wager } });
    };

    const handleFinishClaimClick = () => {
        // Navigate to accept-game and pass the challenger and wager as state
        navigate('/finish-game-claim', { state: { challenger: notification.player, wager: notification.wager } });
    };

    const renderActionButton = () => {
        switch (notification.action) {
            case 'Start':
                return (
                    <button 
                        onClick={handleStartClick}
                        className="text-black text-center text-xs font-extrabold self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24 bg-yellow-300"
                        style={{ minWidth: '100px' }}
                    >
                        {notification.action}
                    </button>
                );
            case 'Finish':
                return (
                    <button 
                        onClick={handleFinishClick}
                        className="text-black text-center text-xs font-extrabold self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24 bg-yellow-300"
                        style={{ minWidth: '100px' }}
                    >
                        {notification.action}
                    </button>
                );
            case 'Claim':
                return (
                    <button 
                        onClick={handleFinishClaimClick}
                        className="text-black text-center text-xs font-extrabold self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24 bg-yellow-300"
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
                            className={`text-black text-center text-xs font-extrabold self-stretch max-w-full px-5 py-3 rounded-[200px] max-sm:ml-24 ${notification.action === 'Delete' ? 'bg-zinc-500' : 'bg-yellow-300'}`}
                            style={{ minWidth: '100px' }}
                        >
                            {notification.action}
                        </button>
                    </>
                );
        }
    };


    return (
        <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center w-full mb-2">
            <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2">
                    {notification.player}
            </div>
            <div className="text-pink-300 text-left text-xs font-bold tracking-tight self-center my-auto max-sm:ml-2">
                {notification.wager}
            </div>
            <div className="flex justify-end">
                {renderActionButton()}
            </div>
        </div>
    );
}

type NotificationsProps = {
    notifications: GameState[];
};

function Notifications({ notifications }: NotificationsProps) {
    return (
        <section className="border-[color:var(--Pink,#FFAED5)] self-stretch flex grow flex-col mt-8 pr-4 pb-6 border-2 border-solid">
            <div className="bg-pink-300 flex max-w-full flex-col px-5 py-2 self-start">
                <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
                    NOTIFICATIONS
                </div>
            </div>
            <div className="items-start self-stretch flex grow flex-col ml-5 mt-4 pl-px self-start">
                {notifications.map(notification => (
                <NotificationItem key={notification.player} notification={notification} />
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

    const handleStartClick = () => {
        // Navigate to accept-game and pass the challenger and wager as state
        navigate('/accept-game', { state: { challenger: game.player, wager: game.wager } });
    };

    const renderActionButton = () => {
        switch (game.action) {
            case 'Start':
                return (
                    <button 
                        onClick={handleStartClick}
                        className="text-black flex items-center justify-center text-xs font-extrabold bg-yellow-300 rounded-[200px] whitespace-nowrap max-sm:w-[78px] px-5 py-3 w-[fit-content] mr-2"
                        style={{ minWidth: '100px' }}
                    >
                        {game.action}
                    </button>
                );
            case 'Claim':
                // Assuming 'Claim' needs a special button not shown in this snippet
                // This is just an example
                return (
                    <>
                        <div 
                        className="text-black flex items-center justify-center text-xs font-extrabold bg-zinc-500 rounded-[200px] whitespace-nowrap max-sm:w-[78px] px-5 py-3 w-[fit-content] mr-2"
                        style={{ minWidth: '100px' }}
                        >
                        {timeLeft[game.player] && `${String(timeLeft[game.player].hours).padStart(2, '0')}:${String(timeLeft[game.player].minutes).padStart(2, '0')}:${String(timeLeft[game.player].seconds).padStart(2, '0')}`}
                        </div>
                        <button 
                            className="text-black flex items-center justify-center text-xs font-extrabold bg-zinc-500 rounded-[200px] whitespace-nowrap max-sm:w-[78px] px-5 py-3 w-[fit-content]"
                            style={{ minWidth: '100px' }}
                        >
                            Ping
                        </button>
                    </>
                );
            default:
                // The 'else' part for '... other buttons'
                return (
                    <>
                        <button 
                        className="text-black flex items-center justify-center text-xs font-extrabold bg-zinc-500 rounded-[200px] whitespace-nowrap max-sm:w-[78px] px-5 py-3 w-[fit-content] mr-2"
                        style={{ minWidth: '100px' }}
                        >
                            {game.action}
                        </button>
                        <button 
                            className="text-black flex items-center justify-center text-xs font-extrabold bg-zinc-500 rounded-[200px] whitespace-nowrap max-sm:w-[78px] px-5 py-3 w-[fit-content]"
                            style={{ minWidth: '100px' }}
                        >
                            Ping
                        </button>
                    </>
                );
        }
    };


    return (
        <div className="grid grid-cols-[1fr,auto,1fr] gap-5 items-center w-full mb-2">
            <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto">
                {game.player}
            </div>
            <div className="text-red-500 text-left text-xs font-bold self-center my-auto max-sm:mr-auto">
                {game.wager}
            </div>
            <div className="flex justify-end">
                {renderActionButton()}
            </div>
        </div>
    );
}

type LiveGamesProps = {
    liveGames: GameState[];
    timeLeft: { [key: string]: any };
};

function LiveGames({ liveGames, timeLeft }: LiveGamesProps) {
    return (
        <section className="border-[color:var(--Red,#F63B3B)] self-stretch flex grow flex-col mt-7 pr-5 pb-8 border-2 border-solid">
            <div className="bg-red-500 flex max-w-full flex-col px-5 py-2 self-start">
                <div className="text-neutral-900 text-left text-xs font-extrabold leading-3 self-center whitespace-nowrap">
                    LIVE GAMES
                 </div>
            </div>
            <div className="items-start self-stretch flex grow flex-col ml-5 mt-3.5 self-start">
                {liveGames.map(game => (
                <LiveGameItem key={game.player} game={game} timeLeft={timeLeft} />
                ))}
            </div>
        </section>
    );
}


  
function Home() {
    const gameStates: GameState[] = [
        { player: "Alice", wager: "10 P", action: "Start" },
        { player: "Bob", wager: "20 P", action: "Finish" },
        { player: "Charlie", wager: "30 P", action: "Reneg" },
        { player: "David", wager: "40 P", action: "Delete" },
        { player: "Eva", blockheight: 10500, wager: "50 P", action: "Claim" },
        { player: "Frank", blockheight: 105000, wager: "60 P", action: "Claim" }
    ];

    const aleo_blockheight: number = 50000;
    const aleo_blocks_per_hr: number = 6055;

    const liveGames = gameStates.filter(game => game.action === 'Reneg' || (game.action === 'Claim' && game.blockheight <= aleo_blockheight));
    const notifications = gameStates.filter(game => ['Start', 'Finish', 'Delete'].includes(game.action) || (game.action === 'Claim' && game.blockheight > aleo_blockheight));

    // Timer logic
    const calculateTimeLeft = (blockheight: number) => {
        const hoursLeft = (blockheight - aleo_blockheight) / aleo_blocks_per_hr;
        return {
            hours: Math.floor(hoursLeft),
            minutes: Math.floor((hoursLeft % 1) * 60),
            seconds: Math.floor((((hoursLeft % 1) * 60) % 1) * 60),
        };
    };

    const initialTimeLeft = liveGames.reduce<{ [key: string]: any }>((acc, game) => {
        if (game.action === 'Claim') {
            acc[game.player] = calculateTimeLeft(game.blockheight);
        }
        return acc;
    }, {});

    const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>(initialTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime: { [key: string]: any } = {};
    
                // eslint-disable-next-line prefer-const
                for (let player in prevTime) {
                    let { hours, minutes, seconds } = prevTime[player];
    
                    if (seconds < 59) seconds++;
                    else if (minutes < 59) { minutes++; seconds = 0; }
                    else { hours++; minutes = 0; seconds = 0; }
    
                    newTime[player] = { hours, minutes, seconds };
                }
    
                return newTime;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="w-full bg-netural-900 px-1">
            <TotalWinnings />
            <NewGame />
            <Notifications notifications={notifications} />
            <LiveGames liveGames={liveGames} timeLeft={timeLeft} />
            </div>
            <div className="text-center mt-4 pb-4 px-4"> {/* Adding px-4 back here to maintain padding for the bottom button */}
                <button className="items-center bg-orange-500 p-2 rounded-full text-xs">Past Games</button>
            </div>
        </div>
    );
}

export default Home;
