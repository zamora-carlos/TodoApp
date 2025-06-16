import type { ReactNode } from 'react';

type PaginationButtonProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function PaginationButton({
  isActive = false,
  isDisabled = false,
  onClick,
  children,
}: PaginationButtonProps) {
  const baseStyles =
    'flex items-center justify-center w-10 h-10 rounded-xl text-slate-700';

  const activeStyles = isActive ? 'border border-slate-300 bg-slate-50' : '';

  const interactiveStyles =
    !isDisabled && !isActive
      ? 'hover:border hover:border-slate-300 hover:bg-slate-100 cursor-pointer'
      : '';

  const disabledStyles =
    isDisabled && !isActive ? 'opacity-50 cursor-not-allowed' : '';

  const className = `${baseStyles} ${activeStyles} ${interactiveStyles} ${disabledStyles}`;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      aria-disabled={isDisabled}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
