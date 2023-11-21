import Button from "./Button";
import Nav from "./Nav";

export type BannerProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  step: number,
  totalSteps: number,
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
}

export const Banner = ({title, body, step, totalSteps, leftDisabled = false, rightDisabled = false, onClickLeft, onClickRight}: BannerProps) => {
  return (
    <div className='z-10 p-8 relative flex flex-col items-center justify-center bg-bg1 border-[5px] border-bg2 rounded-[20px]'>
      <h1 className='font-header text-[72px] sm:text-[96px] overflow-visible whitespace-nowrap text-center font-extrabold leading-[72px] sm:leading-[96px] tracking-tight text-primary-white'>
        {title}
      </h1>
      <div className='mt-8 mb-8 w-full gap-4 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
        {body}
      </div>
      <div className='flex gap-4 pb-4'>
        <Button
          variant='primary'
          disabled={leftDisabled}
          onClick={onClickLeft}
        >
          {`<-`}
        </Button>
        <Button
          variant='primary'
          disabled={rightDisabled}
          onClick={onClickRight}
        >
          {`->`}
        </Button>
      </div>
      <Nav step={step} totalSteps={totalSteps} />
    </div>
  )
}

export const NakedBanner = ({ title, body }: {title: React.ReactNode; body: React.ReactNode}) => {
  return (
    <div className='z-10 p-8 relative flex flex-col items-center justify-center bg-bg1 border-[5px] border-bg2 rounded-[20px] gap-8'>
      <h1 className='font-header text-[96px] overflow-visible whitespace-nowrap text-center font-extrabold leading-[104.86px] tracking-tight text-primary-white'>
        {title}
      </h1>
      <div className='max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
        {body}
      </div>
    </div>
  )
}