import prisma from "../../prisma/migrations/connect";
import { asyncHandler } from "../utils/asyncHandler";

// all task of the user
export const allUserTask = asyncHandler(async (req, res) => {
  const all_user_task = await prisma.task.findMany({
    where: {
      currentUser_id: req.user.id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      category:{
        select:{
          type:true
        }
      }
    },
  });
  return res.status(200).json({ all_user_task });
});

// category wise
export const allTaskByCategory=asyncHandler(async(req,res)=>{
  const {category}=req.body
  const result=await prisma.category.findMany({
    where:{
      type:category
    },
    include:{
      tasks:true
    }
  })
  return res.status(200).json({result})
})

