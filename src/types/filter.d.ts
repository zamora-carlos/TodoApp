import type { Priority } from './priority';

export type Filter = {
  name: string | null;
  priority: Priority | null;
  done: boolean | null;
};
