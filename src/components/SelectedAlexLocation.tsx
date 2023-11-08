/* eslint-disable @typescript-eslint/no-explicit-any */
import behindBuildingImg from '../assets/behind_building.svg';
import inWeedsImg from '../assets/in_weeds.svg';

type SelectedAlexLocationProps = {
  answer: string,
  win?: boolean
}

function SelectedAlexLocation({ answer, win }: SelectedAlexLocationProps) {
  const LeftAlex = () => {
    return (
      <div className='flex flex-col gap-2 self-start w-1/2'>
        <img
          loading='lazy'
          src={inWeedsImg}
          className={`aspect-square w-full self-stretch overflow-hidden rounded-[50%] object-cover object-center
                      ${answer === 'In the Weeds' ? '' : 'opacity-40'}`}
          alt='In the Weeds'
        />
        {win === undefined &&
          <div
            className={`self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight
                        ${answer === 'In the Weeds' ? '' : 'opacity-40'}
                        ${answer === 'In the Weeds' ? 'text-green' : 'text-white'}`}
          >
            In the Weeds
          </div>
        }
      </div>
    )
  }

  const RightAlex = () => {
    return (
      <div className='flex flex-col gap-2 self-start w-1/2'>
        <img
          loading='lazy'
          src={behindBuildingImg}
          className={`aspect-square w-full self-stretch overflow-hidden rounded-[50%] object-cover object-center
                      ${answer === 'Behind the Building' ? '' : 'opacity-40'}`}
          alt='Behind the Building'
        />
        {win === undefined &&
          <div
            className={`self-center whitespace-nowrap text-center text-sm font-extrabold tracking-tight
                        ${answer === 'Behind the Building' ? '' : 'opacity-40'}
                        ${
                          answer === 'Behind the Building'
                            ? 'text-green'
                            : 'text-white'
                        }`}
          >
            Behind the Building
          </div>
        }
      </div>
    )
  }

  const WinText = () => {
    return (
      <div className='z-10 w-1/2'>
        <p className="text-center text-green text-6xl font-black">YOU<br />WON!</p>
      </div>
    )

  }

  const LoseText = () => {
    return (
      <div className='z-10 w-1/2'>
        <p className="text-center text-red text-6xl font-black">YOU<br />LOST!</p>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-8 items-center'>
      <div className='flex w-[298px] max-w-full items-center justify-between gap-5 self-center'>
        {win === undefined ?
          <>
            <LeftAlex />
            <RightAlex/>
          </> : 
          <>
            {win === true && answer === 'In the Weeds' &&
              <>
                <LeftAlex />
                <WinText/>
              </>
            }
            {win === true && answer === 'Behind the Building' &&
              <>
                <WinText/>
                <RightAlex />
              </>
            }
            {win === false && answer === 'In the Weeds' &&
              <>
                <LeftAlex />
                <LoseText/>
              </>
            }
            {win === false && answer === 'Behind the Building' &&
              <>
                <LoseText/>
                <RightAlex />
              </>
            }
          </>
        }
        
      </div>
    </div>
  );
}

export default SelectedAlexLocation;