type NavProps = {
  step: number;
  totalSteps: number;
};

function Nav({ step, totalSteps }: NavProps) {
  return (
    <nav className='w-full flex gap-3 justify-center'>
      {Array.from({ length: totalSteps }).map((_, ix) => (
        <div key={ix} className={`w-6 h-3 rounded-full bg-primary ${ix > step ? 'opacity-40' : '' }`}></div>
      ))}
    </nav>
  );
}

export default Nav;
