import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@common/Pagination';
import { changePageAsync } from '@src/redux/todosSlice';
import type { AppDispatch, RootState } from '@src/redux/store';

function TodoTableFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, pageSize, totalItems, content } =
    useSelector((state: RootState) => state.todos);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = startIndex + content.length - 1;

  const handlePageChange = (page: number) => {
    dispatch(changePageAsync(page));
  };

  return (
    <div className="flex items-center justify-center sm:justify-between mt-2">
      {totalItems > 0 && (
        <p className="text-base text-slate-500 sr-only sm:not-sr-only">
          Showing {startIndex} to {endIndex} todos of {totalItems}
        </p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default TodoTableFooter;
