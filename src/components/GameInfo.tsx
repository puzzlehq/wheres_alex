import alexHeadImg from '../assets/alex_head.png';

function GameInfo(props: {
  multisig: string;
  transactionId: string;
  newGame: boolean;
}) {
  return (
    <section className='mb-24 mt-24 flex grow flex-col items-center self-stretch max-md:mt-10'>
      <img
        src={alexHeadImg}
        className='z-0 h-full max-h-[5rem] max-w-[50%] object-contain'
        alt='Alex head'
      />
      <div className='flex w-full flex-col items-center justify-center self-stretch rounded-lg bg-primary-green px-5 py-1.5'>
        <h1 className='max-w-[274px] self-center text-center text-3xl font-extrabold leading-8 text-primary-black'>
          {props.newGame ? 'GAME BEGUN!' : 'GAME ACCEPTED!'}
        </h1>
        <p className='mt-1.5 max-w-[295px] self-center break-words text-center text-base font-extrabold leading-4 text-primary-black'>
          GAME ID: {props.multisig}
        </p>
        <p className='mt-1.5 max-w-[295px] self-center break-words text-center text-base font-extrabold leading-4 text-primary-black'>
          Aleo Transaction ID: {props.transactionId}
        </p>
      </div>
    </section>
  );
}

export default GameInfo;
