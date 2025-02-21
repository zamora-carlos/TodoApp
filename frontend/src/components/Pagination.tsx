import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import PaginationButton from './PaginationButton';
import { AppDispatch } from '../redux/store';
import { changePageAsync } from '../redux/todosSlice';

type PaginationProps = {
  page: number;
  maxPage: number;
};

function Pagination({ page, maxPage }: PaginationProps) {
  const dispatch = useDispatch<AppDispatch>();
  let pageNumbers: number[];

  if (page !== 1 && page !== maxPage) {
    pageNumbers = [page - 1, page, page + 1];
  } else if (page === 1) {
    pageNumbers = [page, page + 1, page + 2];
  } else {
    pageNumbers = [page - 2, page - 1, page];
  }

  pageNumbers = pageNumbers.filter(
    pageNum => pageNum > 0 && pageNum <= maxPage
  );

  const handleClickPaginationButton = (pageNumber: number) => {
    dispatch(changePageAsync(pageNumber));
  };

  const getButtonClass = (isDisabled: boolean) =>
    isDisabled ? 'text-slate-400' : 'text-slate-700';

  return (
    <div className="flex gap-1">
      <PaginationButton
        isActive={false}
        isDisabled={page === 1}
        onClick={() => handleClickPaginationButton(1)}
      >
        <HiChevronDoubleLeft className={getButtonClass(page === 1)} />
      </PaginationButton>
      {pageNumbers.map(currPage => (
        <PaginationButton
          key={currPage}
          isActive={currPage === page}
          isDisabled={currPage === page}
          onClick={() => handleClickPaginationButton(currPage)}
        >
          {currPage}
        </PaginationButton>
      ))}
      <PaginationButton
        isActive={false}
        isDisabled={page === maxPage}
        onClick={() => handleClickPaginationButton(maxPage)}
      >
        <HiChevronDoubleRight className={getButtonClass(page === maxPage)} />
      </PaginationButton>
    </div>
  );
}

export default Pagination;
