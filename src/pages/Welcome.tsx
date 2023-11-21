import { useConnect, useAccount } from '@puzzlehq/sdk';
import swaggers from '../assets/swaggers.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
      <div className='align-items-center flex w-full justify-center'>
        <img
          src={swaggers}
          className='max-h-[163px]'
          alt={'Leo McPirate'}
        />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center rounded-[20px] border-[5px] border-bg2 bg-bg1 p-8'>
        <h1 className='text-primary-white overflow-visible whitespace-nowrap text-center font-header text-[96px] font-extrabold leading-[104.86px] tracking-tight'>
          TREASURE
          <br />
          HUNT
        </h1>
        <p className='text-primary-white mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight'>
          Arhhh! Pirate Leo the Lion hid his Puzzle Piece treasure on Aleo! Use
          your Puzzle Pieces to try to find the correct chests where he hid his
          treasure!
        </p>
        <Button
          className='font-pirata max-w-[250px] font-header'
          onClick={connect}
          color='yellow'
          disabled={loading}
        >
          {loading
            ? 'Loading...'
            : loading
            ? 'Connecting...'
            : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  );
};
