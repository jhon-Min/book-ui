import { toast, Bounce, Slide } from 'react-toastify';

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

function infoNoti(msg = `'🦄 Wow so easy!'`) {
  toast.info(msg, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  });
}

export { successNoti, infoNoti };
