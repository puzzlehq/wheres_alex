import { useNavigate } from 'react-router-dom';

type NavProps = {
  step: number;
  opponent: string;
  answer: string;
};

function Nav({ step, opponent, answer }: NavProps) {
  const navigate = useNavigate();

  return (
    <nav className='mt-11 flex w-full items-start justify-between gap-5 self-stretch max-md:mr-px max-md:mt-10 max-md:justify-center'>
      <a
        href='#'
        className={`self-stretch text-center text-xs font-extrabold tracking-tight text-white ${step === 1 ? 'underline' : ''}`}
      >
        1. CHALLENGE
      </a>
      <div className='self-stretch text-center text-xs font-extrabold tracking-tight text-white'>
        <a
          href='#'
          onClick={() =>
            step > 2 && navigate('/hide-alex', {
              state: { opponent, answer },
            })
          }
          className={`self-stretch text-center text-xs font-extrabold tracking-tight text-white ${step === 2 ? 'underline' : ''}`}
          >
          2. HIDE ALEX
        </a>
      </div>
      <div className='self-stretch whitespace-nowrap text-center text-xs font-extrabold tracking-tight text-white text-opacity-40'>
        <a
          href='#'
          className={`self-stretch text-center text-xs font-extrabold tracking-tight text-white ${step === 3 ? 'underline' : ''}`}
          >
          3.WAGER
        </a>
      </div>
    </nav>
  );
}

export default Nav;
