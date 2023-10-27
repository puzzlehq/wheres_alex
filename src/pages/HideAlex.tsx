import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';

function HideAlex() {
  const navigate = useNavigate();
  const location = useLocation();
  const opponent = location.state?.opponent || "N/A";
  const amount = location.state?.amount || "N/A";
  const [answer, setAnswer] = useState<string | null>(null);

  const handleHideChoice = (choice: string) => {
    setAnswer(choice);
    navigate('/confirm-start-game', {
      state: { opponent, amount, answer }
    });
  };

  const handleBackClick = () => {
    navigate('/start-wager');
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 p-4 md:px-32">
      <div className="mb-6 flex justify-between">
        <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
        <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
        <div className="w-16 h-16 bg-orange-400 rounded-full border-2 border-orange-400"></div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Opponent:</label>
        <div className="bg-gray-200 px-3 py-2 rounded-md text-gray-700">{opponent}</div>
      </div>
      <h2 className="mb-6 text-2xl font-bold text-black">Pick where to Hide Alex!</h2>
      <div className="mb-6 grid gap-4">
        <button onClick={() => handleHideChoice('In Weeds')} className="relative">
          <img src={inWeedsImg} alt="In Weeds" className="rounded-md w-40 h-40" />
          <span className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-50 text-white py-1 rounded-b-md">In Weeds</span>
        </button>
        <button onClick={() => handleHideChoice('Behind Building')} className="relative">
          <img src={behindBuildingImg} alt="Behind Building" className="rounded-md w-40 h-40" />
          <span className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-50 text-white py-1 rounded-b-md">Behind Building</span>
        </button>
      </div>
      <button
        onClick={handleBackClick}
        className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md focus:outline-none focus:bg-gray-400 mt-4"
      >
        Back
      </button>
    </div>
  );
}

export default HideAlex;
