/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import GameState from '../models/game_states';
import rightImageSrc from '../assets/alex_mic_left_tilt.png';
import leftImageSrc from '../assets/alex_mic_right_tilt.png';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();  // Get the history object

    const navigateToNewGame = () => {
        navigate('/new-game');  // Navigate to the NewGame page
    }

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
        <div className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-yellow-500">
            <div className="w-full bg-yellow-500"> {/* Removed px-4 from here */}
            <div className="mb-18 flex items-center justify-between mt-4">
                <img src={leftImageSrc} alt="Left decoration" className="h-full max-w-[40%] max-h-[10rem] object-contain flex-shrink-0" />

                <div className="flex flex-col items-center mx-4 flex-grow">
                    <h2 className="text-2xl font-bold text-black">Total Winnings</h2>
                    <div className="bg-gray-300 p-2 rounded-full mt-2 flex items-center justify-center"> {/* Adjusted the wrapper div */}
                        <span className="text-black text-xl">10 Puzzle Pieces</span>
                    </div>
                    <div className="mb-4 text-center mt-4">
                        {/* Update the button to use the navigateToNewGame function */}
                        <button onClick={navigateToNewGame} className="bg-orange-500 p-3 rounded-full text-white">New Game</button>
                    </div>
                </div>

                <img src={rightImageSrc} alt="Right decoration" className="h-full max-w-[40%] max-h-[10rem] object-contain flex-shrink-0" />
            </div>
                <h3 className="mb-4 text-center text-xl font-bold text-black">Notifications</h3>
                <div className="mb-6 overflow-y-auto notifications-scrollbar px-4" style={{ maxHeight: '200px' }}>
                    {notifications.map(notification => (
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg mb-2">
                            <div className="flex items-center flex-grow">
                                <div className="bg-blue-500 rounded-full w-10 h-10"></div>
                                <span className="ml-2 text-blue-500 text-sm">{notification.player}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className={`p-2 rounded-full text-sm w-24 ${notification.action === 'Delete' ? 'bg-red-500' : 'bg-green-500'}`}>{notification.action}</button>
                                <span className="text-blue-500 text-sm w-12 text-right">{notification.wager}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="mb-4 text-center text-xl font-bold text-black">Live Games</h3>
                <div className="grid gap-2 overflow-y-auto custom-scrollbar px-4" style={{ maxHeight: '250px' }}>
                    {liveGames.map(game => (
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                            <div className="flex items-center flex-grow">
                                <div className="bg-blue-500 rounded-full w-10 h-10"></div>
                                <span className="ml-2 text-blue-500 text-sm">{game.player}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {game.action === 'Claim' ? (
                                    <>
                                        <div className="bg-red-500 p-1 rounded-full text-xs text-white">
                                            {timeLeft[game.player] && `${String(timeLeft[game.player].hours).padStart(2, '0')}:${String(timeLeft[game.player].minutes).padStart(2, '0')}:${String(timeLeft[game.player].seconds).padStart(2, '0')}`}
                                        </div>
                                        <button className="bg-gray-400 p-1 rounded-full text-xs">Ping</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="bg-red-500 p-1 rounded-full text-xs">{game.action}</button>
                                        <button className="bg-gray-400 p-1 rounded-full text-xs">Ping</button>
                                    </>
                                )}
                                <span className="text-blue-500 text-sm w-12 text-right">{game.wager}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <PastGames />
        </div>
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

export default Home;
