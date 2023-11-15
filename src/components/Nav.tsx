type NavProps = {
  step: number;
};

function Nav({ step }: NavProps) {
  return (
    <nav className='mt-11 flex w-full items-start justify-between gap-5 self-stretch text-sm text-center max-md:mr-px max-md:mt-10'>
      <p className={`self-stretch font-extrabold tracking-tight ${
          step == 1 ? 'text-primary-white' : 'text-primary-gray'
        } ${step > 1 ? 'line-through' : ''}`}>
        1. CHALLENGE
      </p>
      <p
        className={`self-stretch font-extrabold tracking-tight ${
          step == 2 ? 'text-primary-white' : 'text-primary-gray'
        } ${step > 2 ? 'line-through' : ''}`}
      >
        2. HIDE ALEX
      </p>
      <p
        className={`self-stretch font-extrabold tracking-tight  ${
          step == 3 ? 'text-primary-white' : 'text-primary-gray'
        }`}
      >
        3. WAGER
      </p>
    </nav>
  );
}

export default Nav;
