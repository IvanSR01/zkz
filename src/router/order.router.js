import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import orderController from "../controller/order.controller.js";
import { createValidation } from "../validation/order.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";
const orderRouter = Router();

orderRouter.get("/all", authMiddleware, orderController.getOrders);
orderRouter.get("/by-id/:id", authMiddleware, orderController.getOrder);
orderRouter.post(
  "/new",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  orderController.createOrder
);
orderRouter.put("/update/:id", authMiddleware, orderController.updateOrder);
orderRouter.delete("/delete/:id", authMiddleware, orderController.deleteOrder);

export default orderRouter;
