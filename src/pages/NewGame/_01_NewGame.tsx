/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import PasteyQR from '../../components/PasteyQR';
import { Step, useNewGameStore } from './store';

function NewGame() {
  const [opponent, setOpponent] = useState<string>('');
  const [setStep] = useNewGameStore((state) => [state.setStep]);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={1} />
        <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
        <PasteyQR setOpponent={setOpponent} opponent={opponent} />
        <Button
          onClick={() => setStep(Step._02_HideAlex)}
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
