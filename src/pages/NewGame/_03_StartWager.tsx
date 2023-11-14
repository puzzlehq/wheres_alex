/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { usePieces } from '../../state/usePieces';
import { useState } from 'react';
import { useAtom } from 'jotai';

function StartWager() {
  const { availableBalance,largestPiece } = usePieces();
  const [error, setError] = useState<string | undefined>();

  /// todo - validate input based on wager
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);

  const [wager, setWager] = useState<number | undefined>(undefined);
  const wagerRecord = inputs.wagerRecord;

  const onWagerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (isNaN(input)) {
      setError('please input a number');
    } else if (input > availableBalance) {
      setError('you do not have enough PIECE');
    } else {
      setError(undefined);
    }
    setWager(input);
    setInputs({ ...inputs, wagerAmount: input.toString(), wagerRecord: largestPiece });
  };

  // Determine input text color based on localAmount value
  const inputTextColor = wager !== 0 ? 'text-primary-green' : '';

  // Determine input opacity based on localAmount value
  const inputOpacity = wager === 0 ? 'opacity-40' : '';

  const isDisabled = wager === undefined || wager <= 0 || !largestPiece || !wagerRecord;

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex w-full flex-col items-center bg-neutral-900 px-5 gap-2'>
        <Nav step={3} />
        <PageHeader bg='bg-primary-blue' text='MAKE YOUR WAGER' />
        <div className='flex w-full flex-col items-center bg-neutral-900 px-5'>
          { error && (
            <p>{error}</p>
          ) }
          <input
            type='number'
            value={wager}
            onChange={onWagerInput}
            className={`mt-14 flex w-full flex-col self-stretch border-[3px] border-primary-gray px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} w-full self-center text-center text-3xl font-bold`}
            placeholder='Enter amount'
          />
          <p>{'Available balance: ' + availableBalance}</p>
          <div className='mb-24 mt-3 self-center whitespace-nowrap text-center text-base font-bold text-primary-green'>
            PIECE
          </div>
        </div>
        <Button
          onClick={() => setStep('4_ConfirmStartGame')}
          disabled={isDisabled || !!error}
          color='green'
          className={`self-center whitespace-nowrap text-center text-3xl font-extrabold tracking-tight text-primary-black 
                        ${isDisabled ? 'bg-opacity-40' : 'hover:bg-primary-green'} 
                        w-full self-stretch rounded-[200px] bg-primary-green p-5 max-md:ml-px max-md:mt-10`}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default StartWager;
