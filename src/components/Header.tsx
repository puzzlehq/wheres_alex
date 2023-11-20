import { useDisconnect, shortenAddress, useAccount } from '@puzzlehq/sdk';
import swaggers from '../assets/swaggers.png';
import Button from './Button';

export const AppHeader = () => {
  const { account } = useAccount();
  const { disconnect, loading } = useDisconnect();

  return (
    <div className='flex w-full items-stretch justify-between gap-5  p-4'>
      {account && account?.address ? (
        <>
          <img
            loading='lazy'
            src={swaggers}
            className='max-h-[100px] self-stretch overflow-hidden fill-white object-cover object-center'
          />
          <Button
            size='md'
            variant='secondary'
            className='w-fit'
            onClick={disconnect}
            disabled={loading}
          >
            {shortenAddress(account.address)}
          </Button>
        </>
      ) : (
        <div className='w-full self-stretch'/>
      )}
    </div>
  );
};
