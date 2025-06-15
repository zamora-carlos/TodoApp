import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@common/Pagination';
import { changePageAsync } from '@src/redux/todosSlice';
import type { AppDispatch, RootState } from '@src/redux/store';

function TodoListPaginationInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, pageSize, totalItems, content } =
    useSelector((state: RootState) => state.todos);

  const start = (currentPage - 1) * pageSize + 1;
  const end = start + content.length - 1;

  const handlePageChange = (page: number) => {
    dispatch(changePageAsync(page));
  };

  return (
    <div className="flex items-center justify-between mt-2">
      {totalItems > 0 && (
        <p className="text-base text-slate-500">
          Showing {start} to {end} todos of {totalItems}
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

export default TodoListPaginationInfo;
