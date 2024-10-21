import { any } from "zod";
import { z, ZodError } from "zod";
export class ErrorResponse extends Error {
  error: any;
  status: number;
  message: string;
  constructor(
    error = [z.ZodError||any],
    status = 500,
    message = "something went wrong",
    stack = ""
  ) {
    super(message);
    (this.error = error), (this.status = status), (this.message = message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
