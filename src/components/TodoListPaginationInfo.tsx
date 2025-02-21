import Pagination from './Pagination';
import type PaginatedResponse from '../types/PaginatedResponse';

interface TodoListPaginationInfoProps {
  pagination: PaginatedResponse;
}

function TodoListPaginationInfo({ pagination }: TodoListPaginationInfoProps) {
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
