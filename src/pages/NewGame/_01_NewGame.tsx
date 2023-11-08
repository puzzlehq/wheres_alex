/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '@puzzlehq/sdk';
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import PasteyQR from '../../components/PasteyQR';

function NewGame() {
  const [opponent, setOpponent] = useState<string>('');
  const { account } = useAccount();
  const navigate = useNavigate();

  console.log(account);

  const navigateToHideAlex = () => {
    if (opponent) {
      navigate('/hide-alex', {
        state: { opponent },
      });
    }
  };

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={1} opponent={opponent} answer='' />
        <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
        <PasteyQR setOpponent={setOpponent} opponent={opponent} />
        <Button
          onClick={navigateToHideAlex}
          color='green'
          disabled={!opponent}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default NewGame;
