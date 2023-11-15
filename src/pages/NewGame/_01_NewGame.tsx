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
    <div className='flex h-full w-full flex-col justify-between items-center px-5 gap-2'>
      <Nav step={1} />
      <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
      <input
        type='text'
        className='mt-5 w-full rounded-lg border-[3px] bg-transparent border-solid border-primary-gray p-4 text-sm font-semibold leading-4 max-md:mr-px'
        placeholder="Enter Opponent's Address"
        id='opponent'
        value={opponent ?? ''}
        onChange={(e) => {
          setInputs({ ...inputs, opponent: e.target.value })
        }}
      />
      <div className='flex flex-col flex-grow'/>
      <Button
        className='mb-6'
        onClick={() => setStep('2_HideAlex')}
        color='green'
        disabled={!aleoAddressRegex.test(inputs.opponent ?? '')}
      >
        NEXT
      </Button>
    </div>
  );
}

export default NewGame;
