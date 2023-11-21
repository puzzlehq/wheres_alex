import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import Button from '../../../components/Button';

const GameOver = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8'>
      <PageHeader bg='bg-primary-blue' text='BETTER LUCK NEXT TIME' />
      <div className='flex flex-grow flex-col' />
      <div className='flex w-full flex-col gap-2'>
        <Button color='green' onClick={() => navigate('/')}>
          REFER A PLAYER
        </Button>
        <Button
          color='gray'
          className='text-primary-black w-full rounded-full bg-[#868686] p-3 text-4xl font-extrabold'
          onClick={() => navigate('/new-game')}
        >
          START ANOTHER GAME
        </Button>
        <Button
          color='transparent'
          className=' text-primary-gray'
          onClick={() => navigate('/')}
        >
          TAKE ME BACK HOME
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
