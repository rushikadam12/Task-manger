import { NextFunction } from "express";

export const Login = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Please provide both email and password");
      (error as any).status = 400; // Set a custom status for the error
      throw error;
    }

    return res.status(200).json({ email, password });
  } catch (error) {
    next(error);
  }
};
