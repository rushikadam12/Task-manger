import { NextFunction } from "express";
import { ErrorResponse } from "../utils/ErrorClass";
import {
  createPasswordHash,
  isPasswordCorrect,
} from "../../prisma/userServices";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../../prisma/migrations/connect";

export const Login = asyncHandler(
  async (req: any, res: any, next?: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorResponse(
        [],
        401,
        "pls pass the email and password",
        new Error().stack
      );
    }
    const result_user = await prisma.user.findFirst({
      where: { email: { contains: email } },
    });
    if (!result_user) {
      throw new ErrorResponse([], 401, "user not found");
    }
    const result = await isPasswordCorrect(password,result_user.password);
    return res.status(200).json({result})
  }
);
