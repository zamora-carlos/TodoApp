import type { TodoResponse } from './TodoResponse';

export type PaginatedResponse = {
  content: TodoResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};
