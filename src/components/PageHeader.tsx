type PageHeaderProps = {
  text: string,
  bg: string,
}

function PageHeader({text, bg}: PageHeaderProps) {
  return (
    <section className={`justify-center items-center self-stretch flex w-full flex-col mt-2 px-5 py-4 max-md:mr-px ${bg}`}>
      <h1 className="text-black text-center text-3xl font-extrabold leading-8 self-center max-w-[274px]">{text}</h1>
    </section>
  );
}

export default PageHeader