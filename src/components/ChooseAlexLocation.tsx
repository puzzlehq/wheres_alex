import { useState } from 'react';
import inWeedsImg from '../assets/in_weeds.svg';
import behindBuildingImg from '../assets/behind_building.svg';

type HideAlexProps = {
  handleButtonClick: (text: string, opponent: string) => void;
  opponent: string;
  hiding: boolean;
};

function ChooseAlexLocation({ handleButtonClick, opponent, hiding }: HideAlexProps) {
  const [answer, setAnswer] = useState('');

  const onButtonClick = (text: string) => {
    handleButtonClick(text, opponent); // Use the prop here
    setAnswer(text);
    console.log(answer);
    console.log(opponent);
  };

  return (
    <section className='flex max-w-full flex-col gap-2'>
      <div className='flex gap-5'>
        <div className='flex flex-col self-center'>
          <button
            onClick={() => onButtonClick('In the Weeds')}
            className='flex w-[150px] flex-col gap-2 items-center hover:opacity-100'
          >
            <img
              loading='lazy'
              src={inWeedsImg}
              className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                answer === 'In the Weeds' ? '' : 'opacity-40'
              }`}
              alt='In the Weeds'
            />
            <div
              className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                answer === 'In the Weeds'
                  ? 'text-green'
                  : 'text-white opacity-40 hover:text-green'
              }`}
            >
              In the Weeds
            </div>
          </button>
        </div>
        <div className='flex flex-col self-start'>
          <button
            onClick={() => onButtonClick('Behind the Building')}
            className='flex w-[150px] flex-col gap-2 items-center hover:opacity-100'
          >
            <img
              loading='lazy'
              src={behindBuildingImg}
              className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                answer === 'Behind the Building' ? '' : 'opacity-40'
              }`}
              alt='Behind the Building'
            />
            <div
              className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                answer === 'Behind the Building'
                  ? 'text-green'
                  : 'text-white opacity-40 hover:text-green'
              }`}
            >
              Behind the Building
            </div>
          </button>
        </div>
      </div>
      {answer && (
        <p className='mt-20 self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-green'>
          {hiding ? `You chose to hide Alex ${answer}!` : `You think Alex is ${answer}`}
        </p>
      )}
    </section>
  );
}

export default ChooseAlexLocation;
