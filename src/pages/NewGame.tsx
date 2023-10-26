import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import qrImg from '../assets/bx-scan.svg';

function NewGame() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleScan = (result: Result | null | undefined, error: Error | null | undefined) => {
    if (result) {
      setWalletAddress(result?.text);
    }
    if (error) {
      console.info(error);
    }
  }

  const handlePasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();
    setWalletAddress(clipboardData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xs w-full p-4 bg-white rounded">
        <div className="flex justify-between mb-4">
          <div className="w-8 h-8 border-2 border-black bg-orange-500 rounded-full"></div>
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full"></div>
          <div className="w-8 h-8 border-4 border-orange-500 rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold mb-4">Who would you like to challenge?</h1>
        <div className="relative mb-2">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter Wallet Address"
            value={walletAddress}
            readOnly
          />
          <button
            onClick={() => {
              // Open the camera to scan for QR codes.
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white border border-white rounded p-1"
          >
            <img src={qrImg} alt="QR Scanner" />
          </button>
        </div>
        <button
          onClick={handlePasteFromClipboard}
          className="w-full py-2 mb-2 border rounded bg-gray-100 text-gray-700"
        >
          Paste from Clipboard
        </button>
        <QrReader
          scanDelay={500}
          onResult={handleScan}
          className="w-full mb-2"
          containerStyle={{ height: '240px' }}
          constraints={{
            facingMode: 'user'
          }}
        />
      </div>
    </div>
  );
}

export default NewGame;


