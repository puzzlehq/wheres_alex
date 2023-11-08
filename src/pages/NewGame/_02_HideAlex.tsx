/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, SetStateAction } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../../components/Nav';
import ChooseAlexLocation from '../../components/ChooseAlexLocation';
import PageHeader from '../../components/PageHeader';

function HideAlex() {
  const location = useLocation();
  const opponentFromLocation = location.state?.opponent ?? 'N/A';
  console.log(opponentFromLocation);
  const answerFromLocation = location.state?.answer ?? '';

  const [answer, setAnswer] = useState(answerFromLocation);
  const [opponent, setOpponent] = useState(opponentFromLocation);
  const handleButtonClick = (
    text: SetStateAction<string>,
    opponent: SetStateAction<string>
  ) => {
    setAnswer(text);
    setOpponent(opponent);
    console.log(opponent);
    console.log(answer);
  };
  const navigate = useNavigate();

  const navigateToStartWager = () => {
    console.log(opponent);
    console.log(answer);
    navigate('/start-wager', {
      state: { ...location.state, opponent, answer },
    });
  };

  return (
    <main className='flex h-full flex-col justify-between bg-neutral-900'>
      <div className='flex h-full w-full flex-col items-center bg-neutral-900 px-5'>
        <Nav step={2} answer={answer} opponent={opponent} />
        <PageHeader text='HIDE ALEX' bg='bg-primary-blue' />
        <ChooseAlexLocation
          handleButtonClick={handleButtonClick}
          opponent={opponent}
          hiding={true}
        />
        <div className='flex flex-grow flex-col' />

        <button
          onClick={navigateToStartWager}
          disabled={!answer}
          className={`self-center whitespace-nowrap text-center text-3xl font-extrabold tracking-tight text-primary-black
            ${!answer ? 'bg-opacity-40' : 'hover:bg-primary-green'}
            w-full self-stretch rounded-[200px] bg-primary-green p-5 max-md:ml-px max-md:mt-10`}
        >
          NEXT
        </button>
      </div>
    </main>
  );
}

export default HideAlex;
