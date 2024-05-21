import { Router } from "express";
import authRouter from "./auth.router.js";
import orderRouter from "./order.router.js";
import reportRouter from "./report.router.js";
const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/report", reportRouter);

export default apiRouter;
