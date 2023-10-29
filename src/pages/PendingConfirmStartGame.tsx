/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from "html5-qrcode";
import qrImg from '../assets/qrscanner.svg';

function PendingConfirmStartGame() {
    return (
        <main className="h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-900">
            <div className="items-center bg-neutral-900 flex w-full flex-col px-5">
                <Navigation />
                <Section />
                <PasteyQR />
                <NextButton />
            </div>
        </main>
    );
}

function PasteyQR() {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const navigate = useNavigate();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const navigateToHideAlex = () => {
        navigate('/hide-alex', {
            state: { walletAddress }
        });  // Navigate to the NewGame page
    }

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
        navigateToHideAlex(); // Navigate when scan is successful
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
        navigateToHideAlex(); // Navigate when address is pasted from clipboard
    };
    return (
        <div className="flex w-full flex-col items-center"> 
            <input 
                    type="text" 
                    className="text-white text-sm font-semibold leading-4 border-[color:var(--Grey,#868686)] self-stretch w-full mt-5 pl-3.5 pr-5 py-7 border-[3px] border-solid max-md:mr-px"
                    placeholder="Enter Wallet Address"
                    id="wallet-address" 
                    value={walletAddress}
                    readOnly
            />
            <div className="flex items-center">  {/* Use flex container here */}
                <button
                    onClick={handlePasteFromClipboard}
                    className="text-black text-center text-xs font-extrabold bg-zinc-500 self-center w-[197px] max-w-full mt-3 px-5 py-3 rounded-[200px]"
                >
                PASTE FROM CLIPBOARD
                </button>
                <button
                    onClick={startScanner}
                >
                    <img src={qrImg} alt="QR Scanner" className="ml-5 mt-3 h-full"/>
                </button>
            </div>
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
    );
}

function NextButton() {
    const navigate = useNavigate();  // Get the history object

    const navigateToHideAlex = () => {
        navigate('/hide-alex');  // Navigate to the NewGame page
    }
    return (
        <button 
            onClick={navigateToHideAlex}
            className="text-black text-center text-3xl font-extrabold tracking-tight self-center whitespace-nowrap bg-lime-600 bg-opacity-40 hover:bg-[#4EC331] self-stretch w-full mt-24 p-5 rounded-[200px] max-md:ml-px max-md:mt-10"
        > 
            NEXT 
        </button>
    );
}

function Navigation() {
  return (
    <nav className="justify-between items-start self-stretch flex w-full gap-5 mt-11 max-md:justify-center max-md:mr-px max-md:mt-10">
      <a href="#" className="text-white text-center text-xs font-extrabold tracking-tight underline self-stretch">
        <ul>
          <li>1. CHALLENGE</li>
        </ul>
      </a>
      <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch">
        <a href="#">2. HIDE ALEX</a>
      </div>
      <div className="text-white text-opacity-40 text-center text-xs font-extrabold tracking-tight self-stretch whitespace-nowrap">
        <a href="#">3.WAGER</a>
      </div>
    </nav>
  );
}

function Section() {
  return (
    <section className="justify-center items-center bg-sky-400 self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px">
      <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]"> WHO WOULD YOU LIKE TO CHALLENGE? </h1>
    </section>
  );
}

export default PendingConfirmStartGame;