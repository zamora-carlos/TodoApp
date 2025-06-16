import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { removeToast } from '@src/redux/toastSlice';
import { AppDispatch } from '@src/redux/store';
import { DEFAULT_TOAST_DURATION, TOAST } from '@constants/toast';
import type { Toast } from '@customTypes/toast';

type ToastItemProps = {
  toast: Toast;
  index: number;
};

function ToastItem({ toast, index }: ToastItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const [removing, setRemoving] = useState(false);

  const duration = toast.duration || DEFAULT_TOAST_DURATION;

  const getToastStyles = () => {
    const baseStyles =
      'px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center justify-between min-w-80 max-w-96';

    switch (toast.type) {
      case TOAST.SUCCESS:
        return `${baseStyles} bg-green-400`;
      case TOAST.ERROR:
        return `${baseStyles} bg-red-400`;
      default:
        return `${baseStyles} bg-gray-400`;
    }
  };

  const getIcon = () => {
    const iconProps = {
      className: 'text-lg flex-shrink-0',
      'aria-hidden': true,
    };

    switch (toast.type) {
      case TOAST.SUCCESS:
        return <BsCheckCircleFill {...iconProps} />;
      case TOAST.ERROR:
        return <BsFillExclamationDiamondFill {...iconProps} />;
      default:
        return null;
    }
  };

  const getAriaLabel = () => {
    switch (toast.type) {
      case TOAST.SUCCESS:
        return `Success notification: ${toast.message}`;
      case TOAST.ERROR:
        return `Error notification: ${toast.message}`;
      default:
        return `Notification: ${toast.message}`;
    }
  };

  const handleClose = useCallback(() => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, 300);
  }, [dispatch, toast.id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  // Animation entrance effect
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  return (
    <div
      className={`
        transition-all duration-300 ease-out transform mb-2.5
        ${visible && !removing ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      style={{
        transform: `translateY(-${index * 4}px)`,
      }}
    >
      <div
        role="alert"
        aria-live="polite"
        aria-label={getAriaLabel()}
        className={getToastStyles()}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Make focusable for keyboard navigation
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <p className="text-sm m-0 flex-1" id={`toast-message-${toast.id}`}>
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="ml-3 p-1 text-white rounded group"
          aria-label={`Close ${toast.type} notification`}
          aria-describedby={`toast-message-${toast.id}`}
        >
          <IoClose
            className="text-xl group-hover:rotate-90 duration-200"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

export default ToastItem;
