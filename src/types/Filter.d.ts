import type { Priority } from './Priority';

export type Filter = {
  name: string | null;
  priority: Priority | null;
  done: boolean | null;
};
