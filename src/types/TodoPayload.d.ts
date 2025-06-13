import type { Priority } from './Priority';

export type TodoPayload = {
  text: string;
  priority: Priority;
  dueDate: string | null;
};
