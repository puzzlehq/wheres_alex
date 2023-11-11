/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom } from './index';
import { Answer } from '../../state/game_states';

function HideAlex() {
  const [proposeGameInputs, setProposeGameInputs] = useAtom(proposeGameInputsAtom);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={2} />
        <PageHeader text='HIDE ALEX' bg='bg-primary-blue' />
        <ChooseAlexLocation
          setAnswer={(answer: Answer) => setProposeGameInputs({...proposeGameInputs, answer})}
          answer={proposeGameInputs.answer}
          hiding={true}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          onClick={() => setProposeGameInputs({...proposeGameInputs, step: '3_StartWager'})}
          disabled={!proposeGameInputs.answer}
          color='green'
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default HideAlex;
