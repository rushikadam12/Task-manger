import { Router } from "express";
import { Login } from "../controller/login.controller";

const router = Router();

router.get("/login", Login);

export default router;
