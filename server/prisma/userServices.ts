import bcrypt from "bcryptjs";

export async function createPasswordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
