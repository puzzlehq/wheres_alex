/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { proposeGameInputsAtom } from './index';
import { useAtom } from 'jotai';
import { aleoAddressRegex } from '../../state/game_states';

function NewGame() {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  const opponent = proposeGameInputs.opponent;

  return (
    <main className='flex h-full w-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={1} />
        <PageHeader text='WHO WOULD YOU LIKE TO CHALLENGE?' bg='bg-primary-blue' />
        <input
          type='text'
          className='mt-5 w-full self-stretch border-[3px] border-solid border-[color:var(--Grey,#868686)] py-7 pl-3.5 pr-5 text-sm font-semibold leading-4 text-primary-white max-md:mr-px'
          placeholder='Enter Wallet Address'
          id='opponent'
          value={opponent ?? ''}
          onChange={(e) => {
            setProposeGameInputs({ ...proposeGameInputs, opponent: e.target.value })
          }}
        />
        <div className='flex flex-col flex-grow'/>
        <Button
          onClick={() => setProposeGameInputs({step: '2_HideAlex'})}
          color='green'
          disabled={!aleoAddressRegex.test(proposeGameInputs.opponent ?? '')}
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default NewGame;
