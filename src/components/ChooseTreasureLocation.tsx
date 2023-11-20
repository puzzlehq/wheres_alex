import inWeedsImg from '../assets/in_weeds.jpg';
import behindBuildingImg from '../assets/behind_building.svg';
import { Answer } from '../state/game_states';

type HideTreasureProps = {
  setAnswer: (answer: Answer) => void;
  answer?: Answer;
  hiding: boolean; // are we hiding alex? or finding alex?
};

function ChooseTreasureLocation({ setAnswer, answer, hiding }: HideTreasureProps) {
  return (
    <section className='flex max-w-full flex-col gap-4 mt-4'>
      <div className='flex gap-5'>
        <TreasureButton imgSrc={inWeedsImg} text='In the Weeds' onClick={() => setAnswer(Answer.left)} selected={answer ? answer === Answer.left : undefined} />
        <TreasureButton imgSrc={behindBuildingImg} text='Behind the Building' onClick={() => setAnswer(Answer.right)} selected={answer ? answer === Answer.right : undefined} />
      </div>
      <p className='self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight text-primary-green'>
        {((): string => {
          if (answer === undefined && hiding) {
            return 'Choose where to hide the Treasure'
          } else if (hiding) {
            return `You chose to hide the Treasure ${answer}`
          } else {
            return `You think Treasure is ${answer}`
          }
        })()}
      </p>
    </section>
  );
}

type TreasureButtonProps = {
  imgSrc: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
}

const TreasureButton = ({ imgSrc, text, selected, onClick }: TreasureButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group hover:outline flex flex-col self-center rounded-lg outline-primary-green ${selected ? 'outline' : ''} flex w-[150px] flex-col gap-2 items-center hover:opacity-100 p-4`}
    >
      <img
        loading='lazy'
        src={imgSrc}
        className={`aspect-square h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover object-center ${
          (selected || selected === undefined) ? '' : 'opacity-40'
        }`}
        alt={text}
      />
      <div
        className={`mt-2.5 whitespace-nowrap text-center text-sm font-extrabold ${
          selected
            ? 'text-primary-green'
          : selected === false ? 
            'text-primary-white opacity-40 group-hover:text-primary-green' : 'text-primary-white'
        }`}
      >
        {text}
      </div>
    </button>
  )
}

export default ChooseTreasureLocation;
