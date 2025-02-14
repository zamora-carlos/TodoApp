import Filter from './Filter';
import Todo from './Todo';

type PaginatedResponse = {
  content: Todo[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  filter: Filter;
};

export default PaginatedResponse;
