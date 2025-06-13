import { Priority } from './Priority';

export type TodoResponse = {
  id: number;
  text: string;
  priority: Priority;
  done: boolean;
  dueDate: string | null;
};
