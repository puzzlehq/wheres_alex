/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '@components/Nav';
import PageHeader from '@components/PageHeader';
import Button from '@components/Button';
import { useGameStore } from '@state/gameStore';
import { useMemo, useState } from 'react';
import { Step, useNewGameStore } from './store';

function StartWager() {
  const [error, setError] = useState<string | undefined>();
  const [inputs, setInputs, setStep] = useNewGameStore((state) => [
    state.inputs,
    state.setInputs,
    state.setStep,
  ]);
  const [availableBalance, largestPiece] = useGameStore((state) => [
    state.availableBalance,
    state.largestPiece,
  ]);
  const [wager, setWager] = useState<number | undefined>(undefined);
  const wagerRecord = inputs?.wager_record;

  const onWagerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (isNaN(input)) {
      setError('Please input a number');
    } else if (input > availableBalance) {
      setError('You do not have enough Prudens');
    } else {
      setError(undefined);
      setInputs({
        ...inputs,
        challenger_wager_amount: input.toString(),
        wager_record: largestPiece,
      });
    }
    setWager(input);
  };

  const { inputTextColor, inputOpacity } = useMemo(() => {
    return {
      inputTextColor: wager !== 0 ? 'text-primary-green' : '',
      inputOpacity: wager === 0 ? 'opacity-40' : '',
    };
  }, [wager]);

  const isDisabled =
    wager === undefined ||
    wager <= 0 ||
    wager > availableBalance ||
    !largestPiece ||
    !wagerRecord;

  return (
    <div className='flex h-full flex-col justify-between gap-2 px-5'>
      <Nav step={3} />
      <PageHeader
        bg='bg-primary-blue'
        text='HOW MUCH WOULD YOU LIKE TO WAGER?'
      />
      <input
        type='number'
        min={0}
        value={wager ?? ''}
        onChange={onWagerInput}
        className={`mt-14 flex w-full flex-col rounded-lg border-[3px] border-primary-gray bg-transparent px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} self-center text-center text-3xl font-bold`}
        placeholder='Enter amount'
      />
      <p className='mx-auto mt-6'>
        {'Available balance: ' + availableBalance} Prudens
      </p>
      {error && <p className='mx-auto text-primary-red'>{error}</p>}
      <div className='flex flex-grow flex-col' />
      <Button
        className='mb-6'
        onClick={() => setStep(Step._04_ConfirmStartGame)}
        disabled={isDisabled || !!error}
        color='green'
      >
        NEXT
      </Button>
    </div>
  );
}

export default StartWager;
