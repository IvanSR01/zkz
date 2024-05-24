import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authValidation from "../validation/auth.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";
const authRouter = Router();

authRouter.post(
  "/login",
  authValidation.loginValidation,
  handleValidationUtils,
  authController.login
);
authRouter.post(
  "/register",
  authValidation.registerValidation,
  handleValidationUtils,
  authController.register
);
authRouter.post("/get-tokens", authController.getTokens);

export default authRouter;
