import type { TodoResponse } from './todoResponse';

export type PaginatedResponse = {
  content: TodoResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};
