import {toast} from "react-toastify";

export const errorHandel = (error: any) => {
    let message = "";
    if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
    } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
    ) {
        message = error.response.data.error;
    } else if (error.message) {
        try {
            message = error.message.toString();
        } catch (e) {
            message = "Error: Unable to extract message from error object.";
        }
    } else {
        message = "Error: Unknown error format.";
    }
    return message;
};

//notification
export const noticeTrue = (message: string) =>
    toast.success(message, { position: "top-right", delay: 200 });
export const noticeFalse = (message: string) =>
    toast.error(message, { position: "top-right", delay: 400 });