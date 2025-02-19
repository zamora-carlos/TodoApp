import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { changePageAsync } from '../redux/todosSlice';

type PaginationProps = {
  page: number;
  maxPage: number;
};

function Pagination({ page, maxPage }: PaginationProps) {
  const dispatch = useDispatch<AppDispatch>();
  let pageNumbers: number[];

  if (page != 1 && page != maxPage) {
    pageNumbers = [page - 1, page, page + 1];
  } else if (page == 1) {
    pageNumbers = [page, page + 1, page + 2];
  } else {
    pageNumbers = [page - 2, page - 1, page];
  }

  pageNumbers = pageNumbers.filter(x => x > 0 && x <= maxPage);

  const handleClickPaginationButton = (pageNumber: number) => {
    dispatch(changePageAsync(pageNumber));
  };

  return (
    <div className="flex gap-1">
      <button
        disabled={1 === page}
        onClick={() => handleClickPaginationButton(1)}
        className="flex items-center justify-center w-10 h-10 text-slate-700 hover:border hover:border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100"
      >
        <HiChevronDoubleLeft />
      </button>
      {pageNumbers.map(currPage => (
        <button
          key={currPage}
          className={
            'flex items-center justify-center w-10 h-10 text-slate-700 hover:border hover:border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100' +
            (currPage === page ? ' border border-slate-300 bg-slate-50' : '')
          }
          disabled={currPage === page}
          onClick={() => handleClickPaginationButton(currPage)}
        >
          {currPage}
        </button>
      ))}
      <button
        disabled={maxPage === page}
        onClick={() => handleClickPaginationButton(maxPage)}
        className="flex items-center justify-center w-10 h-10 text-slate-700 hover:border hover:border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100"
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
}

export default Pagination;
