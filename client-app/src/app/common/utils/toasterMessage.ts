import {toast} from "react-toastify";

export const serverErrorOrNoItemsToast = () => {
    toast.warn('Server Error or No Items. Please, run the search again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const serverTimeoutToast = () => {
    toast.error('Request delayed. Please, try again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}