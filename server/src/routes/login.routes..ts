import { Router } from "express";
import { authorizedTokenRequest, Login } from "../controller/login.controller";
import { SignUp } from "../controller/signup.controller";
import { AuthenticateUser } from "../middleware/Login.middleware";
const router = Router();

router.get("/login", Login);
router.post("/signup", SignUp);
router.post("/accessToken", authorizedTokenRequest);

export default router;
