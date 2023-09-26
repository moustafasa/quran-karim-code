import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // or your preferred library

const catchError = (api) => (next) => (action) => {
  const { error, ...rest } = action;

  if (error) {
    toast(
      <>
        <h2>error</h2>
        <p>{error.message}</p>
      </>,
      { type: "error" }
    );
  }

  return next(rest);
};

export default catchError;
