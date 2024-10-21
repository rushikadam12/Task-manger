import { Router } from "express";
import { AuthenticateUser } from "../middleware/Login.middleware";
import { addUserTask } from "../controller/addTask.controller";
import { validateData } from "../middleware/validatore.middleware";
import { taskSchema } from "../validation/task.validation";
import { allTaskByCategory, allUserTask } from "../controller/getAllTask.controller";
import { deleteTaskById } from "../controller/deleteUserTask.controller";
const router = Router();

router.use(AuthenticateUser); //token validation

router.post("/addtask", validateData(taskSchema), addUserTask);
router.get("/alltask", allUserTask);
router.get("/task_by_category",allTaskByCategory)
router.delete("/delete_task/:id",deleteTaskById)

export default router;
