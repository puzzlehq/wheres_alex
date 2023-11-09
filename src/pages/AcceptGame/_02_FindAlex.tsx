/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from '../../components/PageHeader';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import Button from '../../components/Button';
import { Step, useAcceptGameStore } from './store';

function FindAlex() {
  const [answer, setAnswer, setStep, submit] = useAcceptGameStore((state) => [state.answer, state.setAnswer, state.setStep, state.submit])

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={2} />
        <PageHeader bg='bg-primary-blue' text='FIND ALEX' />
        <ChooseAlexLocation
          onClick={setAnswer}
          hiding={false}
        />
        <div className='flex flex-grow flex-col' />
        <Button
          onClick={async () => {
            await submit()
            setStep(Step._03_Confirmed);
          }}
          disabled={!answer}
          color='green'
        >
          NEXT
        </Button>
      </div>
    </main>
  );
}

export default FindAlex;
