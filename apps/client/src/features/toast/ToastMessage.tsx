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

function ToastMessage({ toast }: { toast: Toast }) {
  return (
    <div
      className={`w-fit min-w-[200px] max-w-[300px] overflow-hidden rounded p-4 font-bold shadow ${toast.isActive ? 'animate-fadeIn' : 'animate-fadeOut'} ${getToastClass(toast.type)}`}
    >
      {toast.message}
    </div>
  );
}

export default ToastMessage;
