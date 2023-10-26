import { useState } from 'react';

function NewGame() {
    const [address, setAddress] = useState("");
  
    const handlePaste = () => {
      navigator.clipboard.readText().then((clipboardData) => {
        setAddress(clipboardData);
      });
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-xs mx-auto px-4 py-8 bg-white rounded-md shadow-md">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-center">Header</h1>
          </div>
  
          {/* Circles */}
          <div className="flex justify-between mb-4">
            <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
            <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
          </div>
  
          {/* Challenge Text */}
          <div className="mb-4">
            <h2 className="text-xl text-center">Who could you like to challenge?</h2>
          </div>
  
          {/* Input Field */}
          <div className="mb-4">
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Wallet Address"
            />
          </div>
  
          {/* Paste Button */}
          <div className="mb-4">
            <button 
              onClick={handlePaste} 
              className="w-full p-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Paste from Clipboard
            </button>
          </div>
        </div>
      </div>
    );
}

export default NewGame