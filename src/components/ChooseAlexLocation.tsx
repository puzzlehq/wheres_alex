import inWeedsImg from '../assets/in_weeds.png';
import behindBuildingImg from '../assets/behind_building.svg';
import { Answer } from '../models/game_states';

type HideAlexProps = {
  setAnswer: (answer: Answer) => void;
  answer?: Answer;
  hiding: boolean; // are we hiding alex? or finding alex?
};

function ChooseAlexLocation({ setAnswer, answer, hiding }: HideAlexProps) {

  console.log(answer);

  return (
    <section className='flex max-w-full flex-col gap-2'>
      <div className='flex gap-5'>
        <div className={`flex flex-col self-center ${answer === Answer.InTheWeeds ? 'border ring-primary-green rounded-lg' : ''}`}>
          <button
            onClick={() => setAnswer(Answer.InTheWeeds)}
            className='flex w-[150px] flex-col gap-2 items-center hover:opacity-100 '
          >
            <img
              loading='lazy'
              src={inWeedsImg}
              className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                answer === Answer.InTheWeeds ? '' : 'opacity-40'
              }`}
              alt={Answer.InTheWeeds}
            />
            <div
              className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                answer === Answer.InTheWeeds
                  ? 'text-primary-green'
                  : 'text-primary-white opacity-40 hover:text-primary-green'
              }`}
            >
              In the Weeds
            </div>
          </button>
        </div>
        <div className={`flex flex-col self-center ${answer === Answer.BehindTheBuilding ? 'border border-primary-green rounded-lg' : ''}`}>
          <button
            onClick={() => setAnswer(Answer.BehindTheBuilding)}
            className='flex w-[150px] flex-col gap-2 items-center hover:opacity-100'
          >
            <img
              loading='lazy'
              src={behindBuildingImg}
              className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
                answer === Answer.BehindTheBuilding ? '' : 'opacity-40'
              }`}
              alt={Answer.BehindTheBuilding}
            />
            <div
              className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
                answer === Answer.BehindTheBuilding
                  ? 'text-primary-green'
                  : 'text-primary-white opacity-40 hover:text-primary-green'
              }`}
            >
              Behind the Building
            </div>
          </button>
        </div>
      </div>
      {answer && (
        <p className='mt-20 self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
          {hiding ? `You chose to hide Alex ${answer}!` : `You think Alex is ${answer}`}
        </p>
      )}
    </section>
  );
}

export default ChooseAlexLocation;
