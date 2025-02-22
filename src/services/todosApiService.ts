import type Metrics from '../types/Metrics';
import type PaginatedResponse from '../types/PaginatedResponse';
import type TodoPayload from '../types/TodoPayload';

const BASE_URL = 'http://localhost:9090/api/v1/todos';

const fetchTodos = async (
  queryParams: URLSearchParams
): Promise<PaginatedResponse> => {
  const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

const createTodo = async (todo: TodoPayload): Promise<void> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to create todo');
};

const updateTodo = async (id: number, todo: TodoPayload): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to update todo');
};

const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};

const toggleTodoStatus = async (id: number, done: boolean): Promise<void> => {
  const endpoint = `${BASE_URL}/${id}/${done ? 'done' : 'undone'}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to toggle todo status');
};

const fetchMetrics = async (): Promise<Metrics> => {
  const response = await fetch(`${BASE_URL}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return response.json();
};

export default {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  fetchMetrics,
};
