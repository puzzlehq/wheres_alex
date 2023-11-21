type NavProps = {
  step: number;
  totalSteps: number;
};

function Nav({ step, totalSteps }: NavProps) {
  return (
    <nav className='flex justify-center gap-3'>
      {Array.from({ length: totalSteps }).map((_, ix) => (
        <div
          key={ix}
          className={`h-3 w-6 rounded-full bg-primary ${
            ix > step ? 'opacity-40' : ''
          }`}
        ></div>
      ))}
    </nav>
  );
}

export default Nav;
