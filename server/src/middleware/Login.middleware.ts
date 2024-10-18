import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/ErrorClass";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

// express.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: any; // Allow user to be of any type
    }
  }
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    
    if (!accessToken || !refreshToken) {
      throw new ErrorResponse([], 401, "unauthorized access");
    }
    const result = (await jwt.verify(
      accessToken,
      "process.env.JWT_KEY"
    )) as jwt.JwtPayload;
    console.log(result)
    if (!result) {
      throw new ErrorResponse([], 401, "token expired");
    }
    req.user = result
    next();
  } catch (error) {
    next(error);
  }
};
