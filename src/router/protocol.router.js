import { Router } from "express";
import protocolController from "../controller/protocol.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createValidation } from "../validation/protocol.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";
const protocolRouter = Router();

protocolRouter.get(
  "/by-report/:id",
  authMiddleware,
  protocolController.getProtocols
);
protocolRouter.get("/by-id/:id", authMiddleware, protocolController.getById);

protocolRouter.post(
  "/create",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  protocolController.createProtocol
);
protocolRouter.post(
  "/gen-table",
  // authMiddleware,
  protocolController.generateExcel
);

protocolRouter.put(
  "/update/:id",
  authMiddleware,
  protocolController.updateProtocol
);
protocolRouter.delete(
  "/delete/:id",
  authMiddleware,
  protocolController.deleteProtocol
);

export default protocolRouter;
