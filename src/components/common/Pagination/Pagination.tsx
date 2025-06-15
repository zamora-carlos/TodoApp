import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import PaginationButton from './PaginationButton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  let pageNumbers: number[];

  if (currentPage !== 1 && currentPage !== totalPages) {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
  } else if (currentPage === 1) {
    pageNumbers = [currentPage, currentPage + 1, currentPage + 2];
  } else {
    pageNumbers = [currentPage - 2, currentPage - 1, currentPage];
  }

  pageNumbers = pageNumbers.filter(
    pageNum => pageNum > 0 && pageNum <= totalPages
  );

  const getIconColorClass = (isDisabled: boolean) =>
    isDisabled ? 'text-slate-400' : 'text-slate-700';

  return (
    <div className="flex items-center gap-1">
      <span className="text-slate-500 mr-2">
        Page {currentPage} of {totalPages}
      </span>

      <PaginationButton
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <HiChevronDoubleLeft className={getIconColorClass(currentPage === 1)} />
      </PaginationButton>

      {pageNumbers.map(pageNumber => (
        <PaginationButton
          key={pageNumber}
          isActive={pageNumber === currentPage}
          isDisabled={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}

      <PaginationButton
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <HiChevronDoubleRight
          className={getIconColorClass(currentPage === totalPages)}
        />
      </PaginationButton>
    </div>
  );
}

export default Pagination;
