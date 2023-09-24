import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // or your preferred library

const catchError = (api) => (next) => (action) => {
  console.log(action);
  if (action?.error) {
    toast(
      <>
        <h2>error</h2>
        <p>{action.error.message}</p>
      </>,
      { type: "error" }
    );
  }
  return next(action);
};

export default catchError;
