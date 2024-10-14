import { NextFunction } from "express";
import { ErrorResponse } from "../utils/ErrorClass";
import { createPasswordHash } from "../../prisma/userServices";
import { asyncHandler } from "../utils/asyncHandler";

export const Login = asyncHandler(
  async (req: any, res: any, next?: NextFunction) => {
    const { email, password } = req.body;
    if(!email||!password){
      throw new ErrorResponse([],401,"pls pass the email and password",new Error().stack)
    }
    const hash = await createPasswordHash(password);
      
  }
);
