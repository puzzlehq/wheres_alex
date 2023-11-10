/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import PasteyQR from '../../components/PasteyQR';
import { Step, proposeGameInputsAtom } from './store';
import { useAtom } from 'jotai';

function NewGame() {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={1} />
        <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
        <PasteyQR setOpponent={(address) => setProposeGameInputs({
          ...proposeGameInputs,
          opponent: address
        })} opponent={proposeGameInputs.opponent ?? ''} />
        <Button
          onClick={() => setProposeGameInputs({
            ...proposeGameInputs,
            step: '2_HideAlex'
          })}
          color='green'
          disabled={!proposeGameInputs.opponent}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default NewGame;
