// src/utils/ErrorHandler.ts
import { Request, Response, NextFunction } from "express";

export const ErrorHandler = (err: any, req: any, res: any, next: NextFunction) => {
    // Set default status code and message
    const status = err.status || 500; // Use the error's status or default to 500
    const message = err.message || "Internal Server Error"; // Use the error's message or a default

    // Log the error for debugging (you can use a logging library here)
    console.error(err);

    // Send the response
    return res.status(status).json({ 
        status,
        message 
    });
};
