import { useState, useRef } from 'react';
import qrImg from '../assets/bx-scan.svg';
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from 'react-router-dom';

function NewGame() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const navigateToPlaceWager = () => {
    navigate("/start-wager", {state:{walletAddress}}); // Navigates to PlaceWager route
  };

  const startScanner = async () => {
    setIsScanning(true);

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode('qr-code-scanner');
    }

    const cameraFacingMode = isMobile ? 'environment' : 'user';

    try {
      await scannerRef.current.start(
        { facingMode: cameraFacingMode },
        { fps: 10, qrbox: 250 },
        handleScanSuccess,
        handleScanError
      );
    } catch (err) {
      console.error("Unable to start scanning", err);
    }
  };  

  const handleScanSuccess = (decodedText: string) => {
    setIsScanning(false);
    setWalletAddress(decodedText);
    navigateToPlaceWager(); // Navigate when scan is successful
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
    navigateToPlaceWager(); // Navigate when address is pasted from clipboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xs w-full p-4 bg-white rounded">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black">Who would you like to challenge?</h1>
          <div className="flex">
            <div className="w-8 h-8 border-2 border-black bg-orange-500 rounded-full mr-2"></div>
            <div className="w-8 h-8 border-4 border-orange-500 rounded-full mr-2"></div>
            <div className="w-8 h-8 border-4 border-orange-500 rounded-full"></div>
          </div>
        </div>
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

export default NewGame;
