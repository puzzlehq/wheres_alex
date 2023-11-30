type NavProps = {
  step: number;
  isChallenger?: boolean;
};

function Nav({ step, isChallenger = true }: NavProps) {
  return (
    <nav className='mt-11 flex w-full items-start justify-between gap-5 self-stretch text-center text-sm max-md:mr-px max-md:mt-10'>
      <p
        className={`self-stretch font-extrabold tracking-tight ${
          step == 1 ? 'text-primary-white' : 'text-primary-gray'
        } ${step > 1 ? 'line-through' : ''}`}
      >
        {isChallenger ? '1. CHALLENGE' : '1. SUBMIT WAGER'}
      </p>
      <p
        className={`self-stretch font-extrabold tracking-tight ${
          step == 2 ? 'text-primary-white' : 'text-primary-gray'
        } ${step > 2 ? 'line-through' : ''}`}
      >
        {isChallenger ? '2. HIDE ALEX' : '2. FIND ALEX'}
      </p>
      <p
        className={`self-stretch font-extrabold tracking-tight  ${
          step == 3 ? 'text-primary-white' : 'text-primary-gray'
        }`}
      >
        {isChallenger ? '3. SET WAGER' : '3. SUBMITTED'}
      </p>
    </nav>
  );
}

export default Nav;
