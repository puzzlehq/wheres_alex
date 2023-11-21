import Button from './Button';
import Nav from './Nav';

export type BannerProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  step: number;
  totalSteps: number;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
};

export const Banner = ({
  title,
  body,
  step,
  totalSteps,
  leftDisabled = false,
  rightDisabled = false,
  onClickLeft,
  onClickRight,
}: BannerProps) => {
  return (
    <div className='relative z-10 flex flex-col items-center justify-center rounded-[20px] border-[5px] border-bg2 bg-bg1 p-8'>
      <h1 className='text-primary-white overflow-visible whitespace-nowrap text-center font-header text-[72px] font-extrabold leading-[72px] tracking-tight sm:text-[96px] sm:leading-[96px]'>
        {title}
      </h1>
      <div className='text-primary-white mb-8 mt-8 w-full max-w-[400px] gap-4 text-center text-base font-bold tracking-tight'>
        {body}
      </div>
      <div className='flex gap-4 pb-4'>
        <Button variant='primary' disabled={leftDisabled} onClick={onClickLeft}>
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
  );
};

export const NakedBanner = ({
  title,
  body,
}: {
  title: React.ReactNode;
  body: React.ReactNode;
}) => {
  return (
    <div className='relative z-10 flex flex-col items-center justify-center gap-8 rounded-[20px] border-[5px] border-bg2 bg-bg1 p-8'>
      <h1 className='text-primary-white overflow-visible whitespace-nowrap text-center font-header text-[96px] font-extrabold leading-[104.86px] tracking-tight'>
        {title}
      </h1>
      <div className='text-primary-white max-w-[400px] text-center text-base font-bold tracking-tight'>
        {body}
      </div>
    </div>
  );
};
