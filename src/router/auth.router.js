import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authValidation from "../auth.validation.js";
const authRouter = Router();

authRouter.post('/login', authValidation.loginValidation, authController.login)
authRouter.post("/register", authValidation.registerValidation, authController.register);
authRouter.post("/getTokens", authController.getTokens);

export default authRouter;
