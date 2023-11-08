/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import qrImg from '../assets/qrscanner.svg';
import { useAccount } from '@puzzlehq/sdk';
import Nav from '../components/Nav';

function Section() {
  return (
    <section className='mt-2 flex w-full flex-col items-center justify-center self-stretch bg-sky-400 px-5 py-4 max-md:mr-px'>
      <h1 className='max-w-[274px] self-center text-center text-3xl font-extrabold leading-8 text-black'>
        {' '}
        WHO WOULD YOU LIKE TO CHALLENGE?{' '}
      </h1>
    </section>
  );
}

interface PasteyQRProps {
  setOpponent: (address: string) => void;
  opponent: string;
}

function PasteyQR({ setOpponent, opponent }: PasteyQRProps) {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
      console.error('Unable to start scanning', err);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    setIsScanning(false);
    setOpponent(decodedText);
    console.log(opponent);
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .catch((err) => console.error('Failed to stop the scanner', err));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScanError = (error: any) => {
    console.info(`QR Code scan error: ${error}`);
  };

  const handlePasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();
    setOpponent(clipboardData);
    console.log(opponent);
  };
  return (
    <div className='flex w-full flex-col items-center'>
      <input
        type='text'
        className='mt-5 w-full self-stretch border-[3px] border-solid border-[color:var(--Grey,#868686)] py-7 pl-3.5 pr-5 text-sm font-semibold leading-4 text-white max-md:mr-px'
        placeholder='Enter Wallet Address'
        id='opponent'
        value={opponent}
        readOnly
      />
      <div className='flex items-center'>
        {' '}
        {/* Use flex container here */}
        <button
          onClick={handlePasteFromClipboard}
          className='mt-3 w-[197px] max-w-full self-center rounded-[200px] bg-zinc-500 px-5 py-3 text-center text-xs font-extrabold text-black'
        >
          PASTE FROM CLIPBOARD
        </button>
        <button onClick={startScanner}>
          <img src={qrImg} alt='QR Scanner' className='ml-5 mt-3 h-full' />
        </button>
      </div>
      <div
        id='qr-code-scanner'
        className='relative mb-2 w-full'
        style={{ height: '240px' }}
      >
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

interface NextButtonProps {
  opponent: string;
}

function NextButton({ opponent }: NextButtonProps) {
  const navigate = useNavigate();

  const navigateToHideAlex = () => {
    if (opponent) {
      navigate('/hide-alex', {
        state: { opponent },
      });
    }
  };

  return (
    <button
      onClick={navigateToHideAlex}
      className={`mt-24 w-full self-center self-stretch whitespace-nowrap rounded-[200px] p-5 text-center text-3xl font-extrabold tracking-tight text-black max-md:ml-px max-md:mt-10
          ${
            opponent
              ? 'bg-lime-600 hover:bg-[#4EC331]'
              : 'cursor-not-allowed bg-lime-600 bg-opacity-20'
          }
          `}
      disabled={!opponent}
    >
      NEXT
    </button>
  );
}

function NewGame() {
  const [opponent, setOpponent] = useState<string>('');
  const { account } = useAccount();

  console.log(account);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav />
        <Section />
        <PasteyQR setOpponent={setOpponent} opponent={opponent} />
        <NextButton opponent={opponent} />
      </div>
    </main>
  );
}

export default NewGame;
