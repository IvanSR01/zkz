import { Router } from "express";
import authRouter from "./auth.router.js";
import orderRouter from "./order.router.js";
import reportRouter from "./report.router.js";
import protocolRouter from "./protocol.router.js";
import userRouter from "./user.router.js";
const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use('/protocol', protocolRouter)
apiRouter.use("/report", reportRouter);
apiRouter.use('/user', userRouter)

export default apiRouter;
