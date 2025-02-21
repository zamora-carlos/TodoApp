import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 transition-transform duration-300 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
    >
      <div
        className={`px-4 py-2 rounded-lg shadow-lg text-slate-800 ${
          type === 'success' ? 'bg-green-200' : 'bg-red-300'
        }`}
      >
        {message}
        <button
          className="ml-3 font-bold cursor-pointer"
          onClick={() => setVisible(false)}
        >
          ✖<span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

export default Toast;
