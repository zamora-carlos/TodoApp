import type { RootState } from '../redux/store';

function buildQueryParams(state: RootState): URLSearchParams {
  const { viewOptions, todos } = state;
  const queryParams = new URLSearchParams();

  if (viewOptions.filter.done !== null) {
    queryParams.append('done', String(viewOptions.filter.done));
  }

  if (viewOptions.filter.name !== null) {
    queryParams.append('text', viewOptions.filter.name);
  }

  if (viewOptions.filter.priority !== null) {
    queryParams.append('priority', viewOptions.filter.priority);
  }

  queryParams.append('order', viewOptions.sortCriteria.order);
  queryParams.append('sort_by', viewOptions.sortCriteria.sortBy);
  queryParams.append('page', String(todos.currentPage));
  queryParams.append('size', String(todos.pageSize));

  return queryParams;
}

export default buildQueryParams;
