import TodoResponse from './TodoResponse';

type PaginatedResponse = {
  content: TodoResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

export default PaginatedResponse;
