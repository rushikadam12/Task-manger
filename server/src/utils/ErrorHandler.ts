// src/utils/ErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "./ErrorClass";

export const ErrorHandler = (
  err: any,
  req: any,
  res: any,
  next: NextFunction
) => {
  let error = err;

  if (!(err instanceof ErrorResponse)) {
    const status = err.status || 500; // Use the error's status or default to 500
    const message = err.message || "Internal Server Error"; // Use the error's message or a default
    const capturedStackTrace = new Error().stack;
    // Log the error for debugging (you can use a logging library here)
    console.error(err);

    // Send the response
    error = new ErrorResponse(err, status, message, capturedStackTrace);
  }
  
  const response = {
    ...error,
    message: error.message
  };
  console.log(error);
  return res.status(error.status).json({
    response,
  });
};
