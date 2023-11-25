/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { usePieces } from '../../state/usePieces';
import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';

function StartWager() {
  const { availableBalance, largestPiece } = usePieces();
  const [error, setError] = useState<string | undefined>();
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);
  const [wager, setWager] = useState<number | undefined>(undefined);
  const wagerRecord = inputs.wager_record;

  const onWagerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (isNaN(input)) {
      setError('Please input a number');
    } else if (input > availableBalance) {
      setError('You do not have enough Pieces');
    } else {
      setError(undefined);
      setInputs({
        ...inputs,
        amount: input.toString(),
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
    <main className='flex h-full flex-col justify-between gap-2 px-5'>
      <Nav step={3} />
      <PageHeader
        bg='bg-primary-blue'
        text='HOW MUCH WOULD YOU LIKE TO WAGER?'
      />
      <input
        type='number'
        min={0}
        value={wager}
        onChange={onWagerInput}
        className={`mt-14 flex w-full flex-col rounded-lg border-[3px] border-primary-gray bg-transparent px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} self-center text-center text-3xl font-bold`}
        placeholder='Enter amount'
      />
      <p className='mx-auto mt-6'>
        {'Available balance: ' + availableBalance} Pieces
      </p>
      {error && <p className='mx-auto text-primary-red'>{error}</p>}
      <div className='flex flex-grow flex-col' />
      <Button
        className='mb-6'
        onClick={() => setStep('4_ConfirmStartGame')}
        disabled={isDisabled || !!error}
        color='green'
      >
        NEXT
      </Button>
    </main>
  );
}

export default StartWager;
