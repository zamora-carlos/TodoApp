type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-slate-800 sm:text-5xl">{title}</h1>
    </div>
  );
}

export default PageTitle;
