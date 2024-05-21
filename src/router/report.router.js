import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import reportController from "../controller/report.controller.js";

const reportRouter = Router();

reportRouter.get("/all", authMiddleware, reportController.getReports);
reportRouter.get("/by-id/:id", authMiddleware, reportController.getReport);

reportRouter.post("/create", authMiddleware, reportController.createReport);
reportRouter.put("/update/:id", authMiddleware, reportController.updateReport);
reportRouter.delete(
  "/delete/:id",
  authMiddleware,
  reportController.deleteReport
);

export default reportRouter;
