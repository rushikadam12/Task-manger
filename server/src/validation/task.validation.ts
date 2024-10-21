import { z } from "zod";

// title,category_type,description,due_date
export const taskSchema = z.object({
  title: z.string().min(1, { message: "title can n ot be null" }),
  category_type: z.string().min(1, { message: "category can not be null" }),
  description: z.string().min(4, { message: "description cant not be null" }),
  due_date: z
    .string()
    .nullable()
    .refine((due_date) => due_date !== null && !isNaN(new Date(due_date).getTime()), {
      message: "pls enter valid date",
    }),
});
