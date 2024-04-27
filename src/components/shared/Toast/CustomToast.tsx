import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { type ToastIcon } from 'react-toastify/dist/types';

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  rtl: true,
  closeButton: false,
};

const showErrorToast = (message: string, icon: ToastIcon) => {
  toast.error(message, {
    ...toastOptions,
    icon: icon,
  });
};

const showNotifyToast = (message: string, icon: ToastIcon) => {
  toast.info(message, {
    ...toastOptions,
    icon: icon,
  });
};

const showSuccessToast = (message: string, icon: ToastIcon) => {
  toast.success(message, {
    ...toastOptions,
    icon: icon,
  });
};

export { showErrorToast, showNotifyToast, showSuccessToast };
