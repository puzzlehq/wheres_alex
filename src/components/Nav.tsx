type NavProps = {
  step: number;
};

function Nav({ step }: NavProps) {

  return (
    <nav className='mt-11 flex w-full items-start justify-between gap-5 self-stretch text-sm text-center max-md:mr-px max-md:mt-10 max-md:justify-center'>
      <p className='self-stretch font-extrabold tracking-tight text-primary-white'>
        1. CHALLENGE
      </p>
      <div className='self-stretch font-extrabold tracking-tight'>
        <p
          className={`self-stretch font-extrabold tracking-tight ${
            step >= 2 ? 'text-primary-white' : 'text-primary-gray'
          }`}
        >
          2. HIDE ALEX
        </p>
      </div>
      <div className='self-stretch whitespace-nowrap font-extrabold tracking-tight'>
        <p
          className={`self-stretch font-extrabold tracking-tight  ${
            step >= 3 ? 'text-primary-white' : 'text-primary-gray'
          }`}
        >
          3. WAGER
        </p>
      </div>
    </nav>
  );
}

export default Nav;
