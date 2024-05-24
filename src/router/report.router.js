import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import reportController from "../controller/report.controller.js";
import { createValidation } from "../validation/report.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";
const reportRouter = Router();

reportRouter.get("/all", authMiddleware, reportController.getReports);
reportRouter.get("/by-id/:id", authMiddleware, reportController.getReport);

reportRouter.post(
  "/create",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  reportController.createReport
);
reportRouter.put("/update/:id", authMiddleware, reportController.updateReport);
reportRouter.delete(
  "/delete/:id",
  authMiddleware,
  reportController.deleteReport
);

export default reportRouter;
