import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/ErrorClass";
import {
  createPasswordHash,
  generateToken,
  isPasswordCorrect,
} from "../../prisma/userServices";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../../prisma/migrations/connect";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    console.log(result_user)
    // check the password
    const result = await isPasswordCorrect(password, result_user.password);
    if (!result) {
      throw new ErrorResponse([], 401, "Invalid credentials");
    }

    // token generation
    const { accessToken, refreshToken } = await generateToken(
      result_user.user_id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({ accessToken, refreshToken });
  }
);

export const authorizedTokenRequest = asyncHandler(
  async (req: Request, res: Response, next?: NextFunction) => {
    const token = req.get("authorized")?.split(" ")[1];
    console.log("toke:",token)
    if (!token) {
      throw new ErrorResponse([], 401, "unauthorized accessToken not found");
    }
    const result = (await jwt.verify(
      token,
      "process.env.JWT_KEY"
    )) as JwtPayload;
    const { accessToken, refreshToken } = await generateToken(result?.user_id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({ accessToken, refreshToken });
  }
);
