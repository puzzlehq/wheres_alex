import { useNavigate } from 'react-router-dom';
import alexHeadImg from '../assets/alex_head.png';

type GameInfoProps = {
  multisig: string;
  eventID: string;
  newGame?: boolean
};

function GameInfo({ multisig, eventID, newGame = true }: GameInfoProps) {
  const navigate = useNavigate();

  return (
    <section className='mb-24 mt-24 flex grow flex-col items-center self-stretch max-md:mt-10'>
      <img
        src={alexHeadImg}
        className='z-0 h-full max-h-[5rem] max-w-[50%] object-contain'
        alt='Alex head'
      />
      <div className='flex w-full flex-col items-center justify-center self-stretch bg-primary-green px-5 py-1.5'>
        <h1 className='max-w-[274px] self-center text-center text-3xl font-extrabold leading-8 text-primary-black'>
          {newGame ? 'GAME BEGUN!' : 'GAME SUBMITTED!'}
        </h1>
        <p className='mt-1.5 max-w-[295px] self-center text-center text-base font-extrabold leading-4 text-primary-black'>
          GAME ID: {multisig}
        </p>
        <a
          href='/'
          onClick={() => navigate('/')}
          className='mt-1.5 max-w-[295px] self-center text-center text-base font-extrabold leading-4 text-primary-black underline'
        >
          View Confirmation: {eventID}
        </a>
      </div>
    </section>
  );
}

export default GameInfo;
