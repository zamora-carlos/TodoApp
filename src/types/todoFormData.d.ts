import type { Priority } from './priority';

export type TodoFormData = {
  text: string;
  priority: Priority;
  dueDate: Date;
};
