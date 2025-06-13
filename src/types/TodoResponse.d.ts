import type { Priority } from './priority';

export type TodoResponse = {
  id: number;
  text: string;
  priority: Priority;
  done: boolean;
  dueDate: string | null;
};
