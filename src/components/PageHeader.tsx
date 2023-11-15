type PageHeaderProps = {
  text: string;
  bg: string;
};

function PageHeader({ text, bg }: PageHeaderProps) {
  return (
    <section
      className={`mt-2 flex w-full flex-col items-center justify-center self-stretch px-5 py-4 max-md:mr-px ${bg} rounded-xl`}
    >
      <h1 className='max-w-[274px] self-center text-center text-3xl font-extrabold leading-8 text-primary-black'>
        {text}
      </h1>
    </section>
  );
}

export default PageHeader;
