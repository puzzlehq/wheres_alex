import { shortenAddress } from '@puzzlehq/sdk';

export const Header = ({
  isConnected,
  address,
}: {
  isConnected: boolean;
  address: string | undefined;
}) => {
  return (
    <div className='flex w-full items-stretch justify-between gap-5 bg-black p-4'>
      {isConnected && address ? (
        <>
          <img
            loading='lazy'
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/cd84c866-46d9-4d71-af0b-2055777b3fcb?'
            className='aspect-[2.95] w-[161px] max-w-full self-stretch overflow-hidden fill-white object-cover object-center'
          />
          <button className='flex w-[155px] max-w-full flex-col items-center justify-center self-stretch whitespace-nowrap rounded-[200px] border-2 border-solid border-[color:var(--White,#FCFCFC)] px-4 py-2 text-center text-xs font-bold text-zinc-50 hover:bg-white'>
            {shortenAddress(address)}
          </button>
        </>
      ) : (
        <div className='w-full self-stretch'></div>
      )}
    </div>
  );
};
