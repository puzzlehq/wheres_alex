/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { useAtom } from 'jotai';
import { useAccount } from '@puzzlehq/sdk';
import { aleoAddressRegex } from '../../utils.js';

function NewGame() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);
  const { account } = useAccount();

  const opponent = inputs.opponent;

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-2 px-5'>
      <Nav step={1} />
      <PageHeader
        text='WHO WOULD YOU LIKE TO CHALLENGE?'
        bg='bg-primary-blue'
      />
      <input
        type='text'
        className='mt-5 w-full rounded-lg border-[3px] border-solid border-primary-gray bg-transparent p-4 text-sm font-semibold leading-4 max-md:mr-px'
        placeholder="Enter Opponent's Address"
        id='opponent'
        value={opponent ?? ''}
        onChange={(e) => {
          setInputs({ ...inputs, opponent: e.target.value });
        }}
      />
      <div className='flex flex-grow flex-col' />
      <Button
        className='mb-6'
        onClick={() => setStep('2_HideAlex')}
        color='green'
        disabled={
          !aleoAddressRegex.test(inputs.opponent ?? '') ||
          inputs.opponent === account.address
        }
      >
        NEXT
      </Button>
    </div>
  );
}

export default NewGame;
