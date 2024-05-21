import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import orderController from "../controller/order.controller.js";
const orderRouter = Router();

orderRouter.post("/new", authMiddleware, orderController.createOrder);
orderRouter.delete("/delete/:id", authMiddleware, orderController.deleteOrder);
orderRouter.get("/all", authMiddleware, orderController.getOrders);

export default orderRouter;
