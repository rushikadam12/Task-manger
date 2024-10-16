import { asyncHandler } from "../utils/asyncHandler";
import { ErrorResponse } from "../utils/ErrorClass";
import prisma from "../../prisma/migrations/connect";
import { createPasswordHash, generateToken } from "../../prisma/userServices";


export const SignUp = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new ErrorResponse([], 401, "pls pass the email and password");
  }

  const result = await prisma.user.findFirst({
    where: { email: { contains: email } },
  });
  if (result) {
    return res.status(200).json({ message: "email already in use" });
  }
  const passwd = await createPasswordHash(password);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      username: name,
      password: passwd,
    },
  });
  const { accessToken, refreshToken } = await generateToken(newUser.user_id);

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken).json({newUser});
  
});
