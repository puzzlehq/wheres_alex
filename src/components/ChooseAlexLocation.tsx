import { useState } from 'react';
import inWeedsImg from '../assets/in_weeds.svg';
import behindBuildingImg from '../assets/behind_building.svg';

type HideAlexProps = {
  handleButtonClick: (text: string, opponent: string) => void;
  opponent: string;
};

function ChooseAlexLocation({ handleButtonClick, opponent }: HideAlexProps) {
  const [answer, setAnswer] = useState('');

  const onButtonClick = (text: string) => {
    handleButtonClick(text, opponent); // Use the prop here
    setAnswer(text);
    console.log(answer);
    console.log(opponent);
  };

  return (
    <div>
      <section className='mb-16 mt-16 flex max-w-full flex-col gap-2  max-md:mt-10'>
        <div className='flex gap-5'>
          <div className='flex flex-col self-center'>
            <button
              onClick={() => onButtonClick('In Weeds')}
              className='flex w-[150px] flex-col items-center hover:opacity-100'
            >
              <img
                loading='lazy'
                src={inWeedsImg}
                className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                  answer === 'In Weeds' ? '' : 'opacity-40'
                }`}
                alt='In Weeds'
              />
              <div
                className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                  answer === 'In Weeds'
                    ? 'text-green'
                    : 'text-white opacity-40 hover:text-green'
                }`}
              >
                In Weeds
              </div>
            </button>
          </div>
          <div className='flex flex-col self-start'>
            <button
              onClick={() => onButtonClick('Behind Building')}
              className='flex w-[150px] flex-col items-center hover:opacity-100'
            >
              <img
                loading='lazy'
                src={behindBuildingImg}
                className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                  answer === 'Behind Building' ? '' : 'opacity-40'
                }`}
                alt='Behind Building'
              />
              <div
                className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                  answer === 'Behind Building'
                    ? 'text-green'
                    : 'text-white opacity-40 hover:text-green'
                }`}
              >
                Behind Building
              </div>
            </button>
          </div>
        </div>
        {answer && (
          <p className='mt-20 self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-green max-md:mt-10'>
            You chose to hide Alex {answer}!
          </p>
        )}
      </section>
    </div>
  );
}

export default ChooseAlexLocation;
