import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createPasswordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function generateToken(userId: string) {
  const accessToken = await jwt.sign({ id: userId }, "process.env.JWT_KEY");
  const refreshToken = await jwt.sign({ id: userId }, "process.env.JWT_KEY");
  return { accessToken, refreshToken };
}

export async function isPasswordCorrect(
  inComingPassword: string,
  userPassword: string
) {
  // TODO:create the accessToken and refreshToken
  // const checkPassword: string = await bcrypt.hash(inComingPassword, 10);
  return await bcrypt.compare(inComingPassword, userPassword);
}
