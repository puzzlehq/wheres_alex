import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';

function PendingConfirmStartGame() {

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-xs w-full p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Review & Confirm</h1>

                <div className="flex justify-center items-center mb-4"> {/* Added justify-center */}
                    <div className="w-20 h-10 bg-gray-300 rounded-full mr-4"> {/* Increased width */}
                    <span className="text-lg">Game x123</span>
                    </div>
                </div>

                <div className="flex justify-center items-center mb-6"> {/* Added justify-center */}
                    <div className="w-16 h-8 bg-gray-300 rounded-full mr-2"> {/* Increased width */}
                        <span>Bob</span>
                    </div>
                    <span className="mx-2 text-black">vs</span>
                    <div className="w-16 h-8 bg-blue-500 rounded-full mr-2"> {/* Increased width */}
                        <span>Alice</span>
                    </div>
                </div>

                <h2 className="text-xl mb-4 text-black text-center">Hid Alex in:</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                        <img src={inWeedsImg} alt="In Weeds" className="rounded-full w-full h-32 object-cover"/>
                    </div>
                    <img src={behindBuildingImg} alt="Behind Building" className="rounded-full w-full h-32 object-cover"/>
                </div>

                <div className="mb-4 text-center">
                    <span className="text-lg text-black">Wager:</span>
                    <div className="w-full h-12 bg-gray-200 rounded mt-2 flex items-center justify-center">
                        <span>10 Puzzle Pieces</span>
                    </div>
                </div>

                <button className="w-full bg-green-500 text-white p-3 rounded">Kickoff Game!</button>

                <button className="w-full mt-4 p-3 text-center">Back</button>
            </div>
        </div>
    );
}

export default PendingConfirmStartGame;
