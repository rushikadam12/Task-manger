import prisma from "../../prisma/migrations/connect";
import { asyncHandler } from "../utils/asyncHandler";

interface InterfaceUpdateTask {
  title: string;
  description: string;
  due_date: Date;
  category_task_id: string;
}

export const updateTaskName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    due_date,
    category_task_id,
  }: InterfaceUpdateTask = req.body;
  const dateObject = {
    title: "",
    description: "",
    due_date: "",
    category_task_id: "",
  };
  const updates = { title, description, due_date, category_task_id };
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined || value !== "") {
      dateObject[key] = value;
    }
    // TODO:create the object and filter the values to pass to the object
}
  const result = await prisma.task.update({
    where: {
      task_id: id,
    },
    body: {
      title,
      description,
      due_date,
      category_task_id,
    },
  });
});
