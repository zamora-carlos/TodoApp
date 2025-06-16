type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header>
      <h1 className="text-4xl font-bold text-slate-800 sm:text-5xl">{title}</h1>
    </header>
  );
}

export default Header;
