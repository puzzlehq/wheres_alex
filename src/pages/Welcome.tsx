import { useConnect, useAccount } from '@puzzlehq/sdk';
import bottomImageSrc from '../assets/treasure_map.png';
import swaggers from '../assets/swaggers.png';
import { useNavigate } from 'react-router-dom';
import { useEffect,  } from 'react';
import Button from '../components/Button.js';


export const Welcome = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const { loading, connect } = useConnect();

  useEffect(() => {
    if (account) {
      navigate('/');
    }
  }, [account, navigate]);

  return (
    <div className='h-full w-full items-stretch justify-between'>
      <div className='w-full flex justify-center align-items-center'>
        <img
          src={swaggers}
          className='max-h-[163px]'
          alt={'Swaggers McPirate'}
        />
      </div>
      <div className='z-10 p-8 relative flex flex-col items-center justify-center bg-bg1 border-[5px] border-bg2 rounded-[20px]'>
        <h1 className='font-header text-[96px] overflow-visible whitespace-nowrap text-center font-extrabold leading-[104.86px] tracking-tight text-primary-white'>
          TREASURE<br />HUNT
        </h1>
        <p className='mt-8 mb-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
          A thrilling game showcasing the power of Aleo and the Puzzle
          multiparty privacy stack through a wager between friends!
        </p>
        <Button
          className='font-header max-w-[250px] font-pirata'
          onClick={connect}
          color='yellow'
          disabled={loading}
        >
          {loading ? 'Loading...' : loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </div>
      <img
        src={bottomImageSrc}
        alt='Treasure Map'
        className='fixed justify-center items-center w-screen bottom-0 left-0 object-contain'
        style={{
          transformOrigin: 'center bottom'
        }}
      />
    </div>
  );
};