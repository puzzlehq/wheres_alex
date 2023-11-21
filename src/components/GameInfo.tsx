import treasure from '../assets/treasure_open_full.png';

function GameInfo(props: { multisig: string, eventId: string, newGame: boolean }) {

  return (
    <section className='mb-24 mt-24 flex grow flex-col gap-2 items-center self-stretch max-md:mt-10'>
      <img
        src={treasure}
        className='z-0 h-full max-h-[5rem] max-w-[50%] object-contain'
        alt='Swaggers McPirate head'
      />
      <div className='flex w-full flex-col items-center rounded-lg justify-center self-stretch bg-bg1 border-bg2 border-[5px] px-5 py-1.5'>
        <p className='mt-1.5 max-w-[295px] self-center text-center text-base font-extrabold leading-4 break-words text-primary-black'>
          GAME ID: {props.multisig}
        </p>
      </div>
    </section>
  );
}

export default GameInfo;
