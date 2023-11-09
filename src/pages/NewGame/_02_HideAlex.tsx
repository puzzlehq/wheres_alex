/* eslint-disable @typescript-eslint/no-explicit-any */
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { Step, useNewGameStore } from './store';

function HideAlex() {
  const [answer, setAnswer, setStep] = useNewGameStore((state) => [state.answer, state.setAnswer, state.setStep]);

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={2} />
        <PageHeader text='HIDE ALEX' bg='bg-primary-blue' />
        <ChooseAlexLocation
          onClick={setAnswer}
          hiding={true}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          onClick={() => setStep(Step._03_StartWager)}
          disabled={!answer}
          color='green'
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default HideAlex;
