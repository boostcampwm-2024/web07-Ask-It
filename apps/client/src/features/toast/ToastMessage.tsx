import { useEffect, useRef, useState } from 'react';

import { Toast, ToastType } from '@/features/toast/toast.type';

const getToastClass = (type: ToastType) => {
  switch (type) {
    case 'INFO':
      return 'bg-indigo-50 text-indigo-800';
    case 'ERROR':
      return 'bg-red-50 text-red-800';
    case 'SUCCESS':
      return 'bg-green-50 text-green-800';
    default:
      return 'bg-gray-50 text-gray-800';
  }
};

const getToastProgressClass = (type: ToastType) => {
  switch (type) {
    case 'INFO':
      return 'bg-indigo-400';
    case 'ERROR':
      return 'bg-red-400';
    case 'SUCCESS':
      return 'bg-green-400';
    default:
      return 'bg-gray-400';
  }
};

function ToastMessage({ toast }: { toast: Toast }) {
  const [progress, setProgress] = useState(100);

  const startTimeRef = useRef<number | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!toast.isActive)
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        startTimeRef.current = null;
      };

    const updateProgress = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.max(100 - (elapsed / toast.duration) * 100, 0);
      setProgress(newProgress);

      if (newProgress > 0) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    if (animationFrameRef.current === null)
      animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      startTimeRef.current = null;
    };
  }, [toast.isActive, toast.duration]);

  return (
    <div
      className={`w-fit min-w-[200px] max-w-[300px] overflow-hidden p-4 font-medium shadow ${toast.isActive ? 'animate-fadeIn' : 'animate-fadeOut'} ${getToastClass(toast.type)}`}
    >
      {toast.message}
      <div className='relative mt-2 h-1 rounded-full bg-gray-200'>
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${getToastProgressClass(toast.type)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ToastMessage;
