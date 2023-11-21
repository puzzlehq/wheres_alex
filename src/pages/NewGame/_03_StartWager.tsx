/* eslint-disable @typescript-eslint/no-explicit-any */
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { usePieces } from '../../state/usePieces';
import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { Banner } from '../../components/Banner';

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
      setInputs({ ...inputs, wager_amount: input.toString(), wager_record: largestPiece });
    }
    setWager(input);
  };

  const { inputTextColor, inputOpacity } = useMemo(() => {
    return {
      inputTextColor: wager !== 0 ? 'text-primary' : '',
      inputOpacity: wager === 0 ? 'opacity-40' : ''
    };
  }, [wager]);

  const isDisabled = wager === undefined || wager <= 0 || wager > availableBalance || !largestPiece || !wagerRecord;

  return (
    <div className='flex flex-col h-full w-full justify-between items-center px-5'>
      <Banner
        title={<>Set the<br />wager</>}
        body={
          <>
            <input
              type='number'
              min={0}
              value={wager}
              onChange={onWagerInput}
              className={`mt-14 flex w-full flex-col bg-transparent rounded-lg border-[3px] border-primary-gray px-5 py-7 max-md:mt-10 ${inputTextColor} ${inputOpacity} focus-visible:outline-primary self-center text-center text-3xl font-bold`}
              placeholder='Enter amount'
            />
            <p className='mt-6 mx-auto'>{'Available balance: ' + availableBalance} Pieces</p>
            {error && <p className='text-primary-red mx-auto'>{error}</p>}
          </>
        }
        step={2}
        totalSteps={5}
        onClickLeft={() => {
          setStep('2_HideTreasure')
          setInputs({...inputs, wager_record: undefined, wager_amount: undefined})
        }}
        onClickRight={() => setStep('4_ConfirmStartGame')}
        rightDisabled={isDisabled || !!error}
      />
    </div>
  );
}

export default StartWager;
