/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { useAtom } from 'jotai';
import { aleoAddressRegex } from '../../state/game_states';

function NewGame() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);

  const opponent = inputs.opponent;

  return (
    <main className='flex h-full w-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5 gap-2'>
        <Nav step={1} />
        <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
        <input
          type='text'
          className='mt-5 w-full self-stretch border-[3px] border-solid border-[color:var(--Grey,#868686)] py-7 pl-3.5 pr-5 text-sm font-semibold leading-4 text-primary-white max-md:mr-px'
          placeholder='Enter Wallet Address'
          id='opponent'
          value={opponent ?? ''}
          onChange={(e) => {
            setInputs({ ...inputs, opponent: e.target.value })
          }}
        />
        <div className='flex flex-col flex-grow'/>
        <Button
          onClick={() => setStep('2_HideAlex')}
          color='green'
          disabled={!aleoAddressRegex.test(inputs.opponent ?? '')}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default NewGame;
