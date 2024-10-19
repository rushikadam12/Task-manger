import { Router } from "express";
import { AuthenticateUser } from "../middleware/Login.middleware";
import { addUserTask } from "../controller/addTask.controller";
const router = Router();

// testing route
// TODO:create the controller and crate api for user adding the task 

router.get("/addtask", AuthenticateUser,addUserTask);

export default router;
