// Этот файл предназначен для настройки маршрутов для работы с пользователями в приложении.
// Импортируем необходимые модули, middleware и контроллер.

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "../controller/user.controller.js";

// Создаем роутер для работы с пользователями
const userRouter = Router();

// Настраиваем маршрут для получения профиля пользователя
// Используем middleware для аутентификации и контроллер для обработки запроса
userRouter.get('/profile', authMiddleware, userController.getProfile);

// Экспортируем роутер для использования в основном API роутере
export default userRouter;
