import { NextFunction } from "express";

const asyncHandler=(fn:(req?:Request,res?:Response,next?:NextFunction)=>any)=>async(req:Request,res:Response,next:NextFunction)=>{
try {
    await fn(req,res,next)
    
} catch (error) {
    console.log(error)
}
}