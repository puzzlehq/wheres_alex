import { useState, useRef } from 'react';
import qrImg from '../assets/bx-scan.svg';
import { Html5Qrcode } from "html5-qrcode";

function StartWager() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false); // New state variable
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setIsScanning(true); // Set state when scanning starts

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode('qr-code-scanner');
    }

    try {
      await scannerRef.current.start(
        { facingMode: 'user' },
        { fps: 10, qrbox: 250 },
        handleScanSuccess,
        handleScanError
      );
    } catch (err) {
      console.error("Unable to start scanning", err);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    setIsScanning(false); // Reset state when scanning is successful
    setWalletAddress(decodedText);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(err => console.error("Failed to stop the scanner", err));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScanError = (error: any) => {
    console.info(`QR Code scan error: ${error}`);
  };

  const handlePasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();
    setWalletAddress(clipboardData);
  };

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
            onClick={startScanner}
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
        <div id="qr-code-scanner" className="w-full mb-2 relative" style={{ height: '240px' }}>
          {/* Conditionally render the pseudo-element styles only when isScanning is true */}
          {isScanning && (
            <style>
              {`
                #qr-code-scanner::before {
                  content: "";
                  position: absolute;
                  top: 12.5%;
                  left: 12.5%;
                  width: 75%;
                  height: 75%;
                  border: 3px solid lightgreen;
                  background-color: rgba(255, 255, 255, 0.3); /* semi-transparent fill */
                  box-sizing: border-box;
                }
              `}
            </style>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartWager;
