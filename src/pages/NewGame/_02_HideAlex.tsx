/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { useAtom } from 'jotai';
import { proposeGameInputsAtom, proposeGameStepAtom } from './index';
import { Answer } from '../../state/game_states';

function HideAlex() {
  const [inputs, setInputs] = useAtom(proposeGameInputsAtom);
  const [_, setStep] = useAtom(proposeGameStepAtom);

  return (
    <main className='flex h-full flex-col justify-between'>
      <div className='flex h-full w-full flex-col items-center px-5 gap-2'>
        <Nav step={2} />
        <PageHeader text='WHERE WOULD YOU LIKE TO HIDE ALEX?' bg='bg-primary-blue' />
        <ChooseAlexLocation
          setAnswer={(answer: Answer) => setInputs({...inputs, answer})}
          answer={inputs.answer}
          hiding={true}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          className='mb-6'
          onClick={() => setStep('3_StartWager')}
          disabled={!inputs.answer}
          color='green'
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default HideAlex;
