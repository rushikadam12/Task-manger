
import prisma from "../../prisma/migrations/connect";
import { asyncHandler } from "../utils/asyncHandler";
import { ErrorResponse } from "../utils/ErrorClass";

export const deleteTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.task.delete({
    where: {
      task_id: id,
    },
  });
  if(!result){
    throw new ErrorResponse([],401,"in valid id")
  }

  return res.status(200).json({ result });
});
