import swaggersImg from '../assets/swaggers.png';

function GameInfo(props: { multisig: string, eventId: string, newGame: boolean }) {

  return (
    <section className='mb-24 mt-24 flex grow flex-col items-center self-stretch max-md:mt-10'>
      <img
        src={swaggersImg}
        className='z-0 h-full max-h-[5rem] max-w-[50%] object-contain'
        alt='Swaggers McPirate head'
      />
      <div className='flex w-full flex-col items-center rounded-lg justify-center self-stretch bg-primary-green px-5 py-1.5'>
        <h1 className='max-w-[274px] self-center text-center text-3xl font-extrabold leading-8 text-primary-black'>
          {props.newGame ? 'GAME BEGUN!' : 'GAME SUBMITTED!'}
        </h1>
        <p className='mt-1.5 max-w-[295px] self-center text-center text-base font-extrabold leading-4 break-words text-primary-black'>
          GAME ID: {props.multisig}
        </p>
      </div>
    </section>
  );
}

export default GameInfo;
