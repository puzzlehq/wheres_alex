import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function StartWager() {
  const location = useLocation();
  const walletAddress = location.state?.walletAddress || "N/A";
  const [amount, setAmount] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState<string>("");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/new-game');
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempAmount(event.target.value);
  };

  const handleAmountBlur = () => {
    setAmount(tempAmount);
  };

  const handleAmountKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setAmount(tempAmount);
      // Navigate to hide-alex route with walletAddress and amount
      navigate('/hide-alex', {
        state: { walletAddress, amount: amount }
      });
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="p-4 w-full max-w-xs">
        <div className="flex justify-between mb-6">
          <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
          <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
          <div className="w-16 h-16 bg-orange-200 rounded-full border-2 border-orange-400"></div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Opponent:</label>
          <div className="bg-gray-200 px-3 py-2 rounded-md text-gray-700">{walletAddress}</div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Wager:</label>
          <input 
            type="text"
            placeholder="Enter Amount"
            className="w-full px-3 py-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
            onKeyUp={handleAmountKeyPress}
          />
          <div className="text-center mt-2 text-black">Puzzle Pieces</div>
        </div>
        <button
          onClick={handleBackClick}
          className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md focus:outline-none focus:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default StartWager;
