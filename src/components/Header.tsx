import { useDisconnect, shortenAddress, useAccount } from '@puzzlehq/sdk';
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
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/cd84c866-46d9-4d71-af0b-2055777b3fcb?'
            className='aspect-[2.95] w-[161px] max-w-full self-stretch overflow-hidden fill-white object-cover object-center'
          />
          <Button
            size='sm'
            color='white'
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
