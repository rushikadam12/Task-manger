import { Router } from "express";
import { authorizedTokenRequest, Login } from "../controller/login.controller";
import { SignUp } from "../controller/signup.controller";
import { AuthenticateUser } from "../middleware/Login.middleware";
const router = Router();

router.get("/login", Login);
router.post("/signup", SignUp);
router.post("/accessToken", authorizedTokenRequest);

// // testing route
// // TODO:create the controller and crate api for user adding the task and 

// router.get("/testing", AuthenticateUser, (req: any, res: any) => {
//   const user = req.user;
//   console.log(user);
//   return res.status(200).json({ user });
// });

export default router;
