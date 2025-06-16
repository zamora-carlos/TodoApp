import { HiOutlineMenuAlt2 } from 'react-icons/hi';

type HeaderProps = {
  onOpenSidebar: () => void;
};

function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="py-2 border-b border-slate-200 shadow-xs 2xl:py-4 2xl:border-0 2xl:shadow-none">
      <div className="w-9/10 max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={onOpenSidebar}
          className="hamburger-btn 2xl:hidden w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt2 className="w-5 h-5 text-slate-600" />
        </button>

        <div className="ml-auto">A theme switch</div>
      </div>
    </header>
  );
}

export default Header;
