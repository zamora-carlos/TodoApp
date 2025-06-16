import { useDispatch } from 'react-redux';
import { addToast } from '@src/redux/toastSlice';
import { TOAST } from '@constants/toast';
import type { AppDispatch } from '@src/redux/store';

function useToast() {
  const dispatch = useDispatch<AppDispatch>();

  const showSuccess = (message: string, duration?: number) => {
    dispatch(
      addToast({
        message,
        type: TOAST.SUCCESS,
        duration,
      })
    );
  };

  const showError = (message: string, duration?: number) => {
    dispatch(
      addToast({
        message,
        type: TOAST.ERROR,
        duration,
      })
    );
  };

  return { showSuccess, showError };
}

export default useToast;
