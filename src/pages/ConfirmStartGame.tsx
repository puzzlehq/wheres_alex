import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PuzzleAccount from '../models/account';
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';

type Props = {
    account: PuzzleAccount;
};

function ConfirmStartGame({ account }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const player_account = account.address;
  const opponent = location.state?.opponent || "N/A";
  const amount = location.state?.amount || 0;
  const answer = location.state?.answer || "N/A";
  const [gameMultisig, setGameMultisig] = useState<string>("");
  const [seed, setSeed] = useState<Uint8Array>(new Uint8Array());

  useEffect(() => {
    function generateGameMultisig(opponent: string, player_account: string): { gameMultisig: string; seed: Uint8Array; } {
        // Our logic to generate gameMultisig and seed using hooks to wallet wasm
        return {
            gameMultisig: "Game" + opponent + player_account, // example outputs
            seed: new Uint8Array(),
        };
    }
    const result = generateGameMultisig(opponent, player_account);
    setGameMultisig(result.gameMultisig);
    setSeed(result.seed);
    }, [opponent, player_account]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function proposeGame(opponent: string, player_account: string, gameMultisig: string, seed: Uint8Array, amount: number, answer: string) {
        // Our logic here would be for potentially grabbing puzzle records, signatures, and propose game function on Leo
        
        navigate("/pending-confirm-start-game");
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-xs w-full p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Review & Confirm</h1>
                <div className="flex justify-center items-center mb-4">
                    <div className="w-20 h-10 bg-gray-300 rounded-full mr-4">
                        <span className="mb-4 text-black font-semibold">Game {gameMultisig}</span>
                    </div>
                </div>
                <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-8 bg-gray-300 rounded-full mr-2">
                        <span>{opponent}</span>
                    </div>
                    <span className="mx-2 text-black">vs</span>
                    <div className="w-16 h-8 bg-gray-300 rounded-full mr-2">
                        <span>{player_account}</span>
                    </div>
                </div>
                <h2 className="text-xl mb-4 text-black text-center">Hid Alex in:</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                        <div className={`mb-4 rounded-full w-full h-32 object-cover ${answer === "In Weeds" ? "border-2 border-green-500" : ""}`}>
                            <img src={inWeedsImg} alt="In Weeds" className="rounded-full w-full h-32 object-cover" />
                            <span className="text-center mt-2 text-black">In Weeds</span>
                        </div>
                        <div className={`mb-4 rounded-full w-full h-32 object-cover ${answer === "Behind Building" ? "border-2 border-green-500" : ""}`}>
                            <img src={behindBuildingImg} alt="Behind Building" className="rounded-full w-full h-32 object-cover" />
                            <span className="text-center mt-2 text-black">Behind Building</span>
                        </div>
                    </div>
                </div>

                <p className="mb-4 text-black font-semibold">Wager: {amount} Puzzle Pieces</p>

                <button className="bg-green-500 text-white p-4 rounded-lg mb-4 w-full font-bold" onClick={() => proposeGame(opponent, player_account, gameMultisig, seed, amount, answer)}>
                    Kickoff Game!
                </button>
                <button className="bg-gray-300 text-black p-2 rounded-lg w-1/3" onClick={() => navigate("/hide-alex")}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default ConfirmStartGame;
