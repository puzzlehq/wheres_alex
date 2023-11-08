import { useConnect } from '@puzzlehq/sdk';
import rightImageSrc from '../assets/alex_mic_left_tilt.png';
import leftImageSrc from '../assets/alex_mic_right_tilt.png';
import bottomImageSrc from '../assets/alexbottom.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Welcome = () => {
  const navigate = useNavigate();
  const { connect, isConnected, loading } = useConnect();

  console.log(isConnected);

  useEffect(() => {
    console.log('connecting');
    if (isConnected) {
      console.log('connecting...');
      navigate('/');
    }
  }, [isConnected, loading, navigate]);

  return (
    <div className='flex h-screen w-full items-stretch justify-between'>
      <div className='relative flex h-full w-full flex-col items-center justify-center'>
        <img
          src={rightImageSrc}
          alt='Right top decoration'
          className='absolute right-0 top-0 z-0 h-full max-h-[18rem] max-w-[50%] object-contain'
        />

        <img
          src={leftImageSrc}
          alt='Left decoration'
          className='absolute left-0 top-1/4 z-0 h-full max-h-[20rem] w-3/5 max-w-[80%] -translate-x-1/4 -translate-y-20 transform object-contain'
        />

        <h1 className='z-5 text-24xl max-w-full overflow-visible whitespace-nowrap text-center font-extrabold leading-[40.56px] tracking-tight text-white'>
          WHERE <br /> IS ALEX?{' '}
        </h1>
        <p className='z-10 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight text-white'>
          A thrilling game showcasing the power of Aleo and the Puzzle
          multiparty privacy stack through a wager between friends!
        </p>
        <button
          onClick={connect}
          className='hover:bg-yellow-400 z-10 mt-7 flex w-1/2 items-center justify-center rounded-[200px] bg-yellow px-5 py-8 text-4xl font-extrabold text-black'
        >
          Play!
        </button>

        <img
          src={bottomImageSrc}
          alt='bottom decoration'
          className='center -translate-y-100 absolute bottom-0 z-0 h-full max-h-[12rem] w-3/5 max-w-[35%] transform object-contain'
        />
      </div>
    </div>
  );
};
