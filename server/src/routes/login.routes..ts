import { Router } from "express";
import { Login } from "../controller/login.controller";
import { SignUp } from "../controller/signup.controller";
const router = Router();

router.get("/login", Login);
router.post("/signup", SignUp);

export default router;
