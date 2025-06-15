import { useEffect, useState } from 'react';

type FadeAnimationState = {
  isMounted: boolean;
  isFullyVisible: boolean;
};

function useFadeAnimation(
  isOpen: boolean,
  duration: number = 300
): FadeAnimationState {
  const [isMounted, setIsMounted] = useState(false);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Opening: mount to DOM first, then fade in
      setIsMounted(true);

      const timer = setTimeout(() => {
        setIsFullyVisible(true);
      }, 10);

      return () => clearTimeout(timer);
    } else if (isMounted) {
      // Closing: fade out first, then unmount from DOM
      setIsFullyVisible(false);

      const timer = setTimeout(() => {
        setIsMounted(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, isMounted]);

  return { isMounted, isFullyVisible };
}

export default useFadeAnimation;
