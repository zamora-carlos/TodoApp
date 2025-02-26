import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

function TodoListPaginationInfo() {
  const pagination = useSelector((state: RootState) => state.todos);
  let paginationMessage = '';

  if (pagination.totalItems > 0) {
    const start = (pagination.currentPage - 1) * pagination.pageSize + 1;
    const end =
      (pagination.currentPage - 1) * pagination.pageSize +
      pagination.content.length;
    paginationMessage = `Showing ${start} to ${end} todos of ${pagination.totalItems}`;
  }

  return (
    <div className="flex items-center justify-between mt-2">
      <p className="text-base text-slate-500">
        {paginationMessage && <span>{paginationMessage}</span>}
      </p>
      <Pagination
        page={pagination.currentPage}
        maxPage={Math.max(1, pagination.totalPages)}
      />
    </div>
  );
}

export default TodoListPaginationInfo;
