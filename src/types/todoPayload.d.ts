import type { Priority } from './priority';

export type TodoPayload = {
  text: string;
  priority: Priority;
  dueDate: string | null;
};
