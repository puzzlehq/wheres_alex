/* eslint-disable @typescript-eslint/no-explicit-any */
import { Answer } from '../state/game_states';
import treasure_closed from '../assets/treasure_closed.png';

type SelectedTreasureLocationProps = {
  answer: Answer;
  win?: boolean;
};

function SelectedTreasureLocation({
  answer,
  win,
}: SelectedTreasureLocationProps) {
  const LeftTreasure = () => {
    return (
      <div className='flex w-1/2 flex-col gap-2 self-start'>
        <img
          loading='lazy'
          src={treasure_closed}
          className={`aspect-square w-full self-stretch overflow-hidden rounded-[50%] object-cover object-center
                      ${answer === Answer.left ? '' : 'opacity-40'}`}
          alt={Answer.left}
        />
        {win === undefined && (
          <div
            className={`self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight
                        ${answer === Answer.left ? '' : 'opacity-40'}
                        ${
                          answer === Answer.left ? 'text-primary' : 'text-white'
                        }`}
          >
            Left
          </div>
        )}
      </div>
    );
  };

  const RightTreasure = () => {
    return (
      <div className='flex w-1/2 flex-col gap-2 self-start'>
        <img
          loading='lazy'
          src={treasure_closed}
          className={`aspect-square w-full self-stretch overflow-hidden rounded-[50%] object-cover object-center
                      ${answer === Answer.right ? '' : 'opacity-40'}`}
          alt={Answer.right}
        />
        {win === undefined && (
          <div
            className={`self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight
                        ${answer === Answer.right ? '' : 'opacity-40'}
                        ${
                          answer === Answer.right
                            ? 'text-primary'
                            : 'text-white'
                        }`}
          >
            Right
          </div>
        )}
      </div>
    );
  };

  const WinText = () => {
    return (
      <div className='z-10 w-1/2'>
        <p className='text-center text-6xl font-black text-primary'>
          YOU
          <br />
          WON!
        </p>
      </div>
    );
  };

  const LoseText = () => {
    return (
      <div className='z-10 w-1/2'>
        <p className='text-center text-6xl font-black text-primary-red'>
          YOU
          <br />
          LOST!
        </p>
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <div className='flex w-[298px] max-w-full items-center justify-between gap-5 self-center'>
        {win === undefined ? (
          <>
            <LeftTreasure />
            <RightTreasure />
          </>
        ) : (
          <>
            {win === true && answer === Answer.left && (
              <>
                <LeftTreasure />
                <WinText />
              </>
            )}
            {win === true && answer === Answer.right && (
              <>
                <WinText />
                <RightTreasure />
              </>
            )}
            {win === false && answer === Answer.left && (
              <>
                <LeftTreasure />
                <LoseText />
              </>
            )}
            {win === false && answer === Answer.right && (
              <>
                <LoseText />
                <RightTreasure />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SelectedTreasureLocation;
