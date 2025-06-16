import { TOAST } from '@constants/toast';

export type ToastType = (typeof TOAST)[keyof typeof TOAST];

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  timestamp: number;
};
