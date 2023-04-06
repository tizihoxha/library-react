import { TypeOptions, toast } from "react-toastify";

const toastNotify = (message: string, type: TypeOptions = "success") => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: 'custom-toast'
    });
  };
  export default toastNotify;