import { toast } from "react-toastify"; // or your preferred library

const catchError = (api) => (next) => async (action) => {
  const { error, ...rest } = action;

  if (error) {
    toast(
      <div className="error-cont">
        <p className="msg">{error.message}</p>
      </div>,
      {
        type: "error",
        className: "error-body",
        hideProgressBar: true,
      }
    );
  }

  return next(rest);
};

export default catchError;
