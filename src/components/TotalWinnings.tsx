function TotalWinnings({amount}: {amount: number}) {
  return (
    <section className='mt-8 flex flex-col self-stretch border-2 border-solid border-bg2 bg-bg1 px-2.5 pt-3.5 text-primary rounded-tr-[5px] rounded-tl-[5px] rounded-br-[5px]'>
      <div
        className='overflow-hidden text-right text-[40px] leading-[48px] font-bold tabular-nums'
        style={{ direction: 'rtl' }}
      >
        {amount.toLocaleString()}
      </div>
      <div className='flex w-full'>
        <div className='-ml-2.5 flex max-w-full flex-col self-start bg-bg2 border-[5px] border-bg2 px-5 py-2'>
          <div className='self-center whitespace-nowrap text-left text-xs font-extrabold leading-3 '>
            TOTAL WINNINGS
          </div>
        </div>
        <div className='flex flex-grow' />
        <p className='font-bold text-[16px] self-center'>Puzzle Pieces</p>
      </div>
    </section>
  );
}

export default TotalWinnings;