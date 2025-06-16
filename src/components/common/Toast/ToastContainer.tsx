import { useSelector } from 'react-redux';
import ToastItem from './ToastItem';
import type { RootState } from '@src/redux/store';

function ToastContainer() {
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col">
      {toasts.map((toast, index) => (
        <ToastItem key={toast.id} toast={toast} index={index} />
      ))}
    </div>
  );
}

export default ToastContainer;
