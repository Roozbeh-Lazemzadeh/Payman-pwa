import { Slide, toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type ToastIcon } from 'react-toastify/dist/types';
import './style.css';

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
const copiedToastOptions: ToastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  rtl: true,
  closeButton: false,
  icon: false,
  theme: 'dark',
  transition: Slide,
  bodyClassName: 'copied',
};

const showErrorToast = (message: string, icon: ToastIcon) => {
  toast.error(message, {
    ...toastOptions,
    icon,
  });
};

const showNotifyToast = (message: string, icon: ToastIcon) => {
  toast.info(message, {
    ...toastOptions,
    icon,
  });
};

const showSuccessToast = (message: string, icon: ToastIcon) => {
  toast.success(message, {
    ...toastOptions,
    icon,
  });
};

const showCopiedToast = (message: string) => {
  toast.success(message, {
    ...copiedToastOptions,
  });
};

export { showErrorToast, showNotifyToast, showSuccessToast, showCopiedToast };
