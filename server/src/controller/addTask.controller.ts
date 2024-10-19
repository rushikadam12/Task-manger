import prisma from "../../prisma/migrations/connect";
import { asyncHandler } from "../utils/asyncHandler";

interface InterfaceAddTaskBody{
title:string;
category_type:string;
description:string;
due_date:Date;
}
export const addUserTask = asyncHandler(async (req, res) => {
//   title
// description
// due_date
// category
const {title,category_type,description,due_date}:InterfaceAddTaskBody=req.body
const result=await prisma.category.upsert({
    where:{type:category_type},
    update:{type:category_type},
    create:{type:category_type},
    
})
/*
 task_id          String   @id @default(uuid()) @db.Uuid
  currentUser_id   String   @db.Uuid
  user             User     @relation(fields: [currentUser_id], references: [user_id])
  title            String
  description      String
  due_date         DateTime
  category_task_id String   @db.Uuid
  category         Category @relati
 */
const newTask=await prisma.task.create({
    data:{
        currentUser_id:req.user?.id,
        title:title,
        description:description,
        due_date:due_date,
        category_task_id:result.category_id
        
    }
})


  return res.status(200).json({ newTask });
});
