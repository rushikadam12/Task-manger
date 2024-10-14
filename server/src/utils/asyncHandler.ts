import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "./ErrorClass";

export const asyncHandler =
  (fn: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res,next);
    } catch (error) {
      next(error);
    }
  };
