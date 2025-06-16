import { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';
import useFadeAnimation from '@hooks/useFadeAnimation';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fadeDuration?: number;
};

function Modal({ isOpen, onClose, children, fadeDuration = 300 }: ModalProps) {
  const modalRef = useRef<HTMLElement | null>(null);
  const { isMounted, isFullyVisible } = useFadeAnimation(isOpen, fadeDuration);

  useClickOutside(modalRef, onClose);
  useFocusTrap(modalRef, isMounted && isFullyVisible);

  useEffect(() => {
    if (isMounted && isFullyVisible && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isMounted, isFullyVisible]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMounted) onClose();
    };

    if (isMounted) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [onClose, isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-slate-400/50 transition-opacity z-60 ${
        isFullyVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      style={{ transitionDuration: `${fadeDuration}ms` }}
    >
      <section
        ref={modalRef}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl border border-slate-300 max-w-9/10 transition-translate ${
          isFullyVisible ? 'translate-y-0' : 'translate-y-2'
        }`}
        style={{ transitionDuration: `${fadeDuration}ms` }}
        aria-modal="true"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border border-slate-300 rounded-xl hover:bg-slate-100 group cursor-pointer"
          aria-label="Close modal"
        >
          <IoClose className="text-slate-500 group-hover:rotate-90 transition-transform" />
        </button>
        {children}
      </section>
    </div>
  );
}

export default Modal;
