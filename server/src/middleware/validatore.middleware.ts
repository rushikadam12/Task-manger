import { z, ZodError } from 'zod';
import { Response,Request,NextFunction } from 'express';
import { ErrorResponse } from '../utils/ErrorClass';
export const validateData=(schema:z.ZodObject<any,any>)=>(req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessage:any=error.errors.map((issue:any,index:number)=>({
                [`message_${index+1}`]:`${issue.path.join(".")} is ${issue.message}`
            }))
            throw new ErrorResponse([...errorMessage],400,"",error.stack)
        }else{
            next(error)
        }
        
    }
}