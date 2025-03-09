import { toast, Bounce } from 'react-toastify';

function successNoti(msg = `'🦄 Wow so easy!'`) {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  });
}

export { successNoti };
