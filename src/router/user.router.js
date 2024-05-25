import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "../controller/user.controller.js"
const userRouter = Router()

userRouter.get('/profile', authMiddleware, userController.getProfile)


export default userRouter