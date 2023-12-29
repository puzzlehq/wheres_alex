function TotalWinnings({ amount }: { amount: number }) {
  return (
    <section className='mt-8 flex flex-col self-stretch border-2 border-solid border-[color:var(--primary-green,#4EC331)] px-2.5 pt-3.5 text-primary-green'>
      <div
        className='overflow-hidden text-right text-4xl font-bold tabular-nums'
        style={{ direction: 'rtl' }}
      >
        {amount.toLocaleString()}
      </div>
      <div className='flex w-full'>
        <div className='-ml-2.5 flex max-w-full flex-col self-start bg-primary-green px-5 py-2'>
          <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 text-neutral-900'>
            TOTAL WINNINGS
          </div>
        </div>
        <div className='flex flex-grow' />
        <p className='font-bold'>Puzzle Prudens</p>
      </div>
    </section>
  );
}

export default TotalWinnings;
