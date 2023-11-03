
import { shortenAddress } from '@puzzlehq/sdk';

export const Header = ( { isConnected, address }: { isConnected: boolean, address: string | undefined }) => {
  return (
    <div className="flex w-full items-stretch justify-between gap-5 bg-black p-4">
      {isConnected && address ? (
        <>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd84c866-46d9-4d71-af0b-2055777b3fcb?"
            className="aspect-[2.95] object-cover object-center w-[161px] fill-white overflow-hidden self-stretch max-w-full"
          />
          <button className="border-[color:var(--White,#FCFCFC)] self-stretch flex w-[155px] max-w-full flex-col px-5 py-4 rounded-[200px] border-2 border-solid justify-center items-center hover:bg-white text-zinc-50 text-center text-xs font-bold whitespace-nowrap">
            {shortenAddress(address)}
          </button>
        </>
      ) : (
        <div className="self-stretch w-full"></div>
      )}
    </div>
  );
}
