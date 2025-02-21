type PaginationButtonProps = {
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function PaginationButton({
  isActive,
  isDisabled,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      tabIndex={0}
      className={`flex items-center justify-center w-10 h-10 text-slate-700 rounded-xl ${isActive ? 'border border-slate-300 bg-slate-50' : ''} ${isDisabled && !isActive ? '' : 'hover:border hover:border-slate-300 hover:bg-slate-100 cursor-pointer'}`}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
