// Этот файл предназначен для настройки основных маршрутов API в приложении.
// Импортируем необходимые модули и маршруты.

import { Router } from "express";
import authRouter from "./auth.router.js";
import orderRouter from "./order.router.js";
import reportRouter from "./report.router.js";
import protocolRouter from "./protocol.router.js";
import userRouter from "./user.router.js";

// Создаем основной роутер для API
const apiRouter = Router();

// Настраиваем маршруты для аутентификации
apiRouter.use("/auth", authRouter);

// Настраиваем маршруты для работы с заказами
apiRouter.use("/order", orderRouter);

// Настраиваем маршруты для работы с протоколами
apiRouter.use('/protocol', protocolRouter);

// Настраиваем маршруты для работы с отчетами
apiRouter.use("/report", reportRouter);

// Настраиваем маршруты для работы с пользователями
apiRouter.use('/user', userRouter);

// Экспортируем основной роутер API
export default apiRouter;

