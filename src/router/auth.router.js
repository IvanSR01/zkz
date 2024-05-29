// Этот файл предназначен для настройки маршрутов аутентификации в приложении.
// Импортируем необходимые модули, контроллеры и middleware для валидации.

import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authValidation from "../validation/auth.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";

// Создаем роутер для аутентификации
const authRouter = Router();

// Настраиваем маршрут для входа в систему (логин)
// Используем middleware для валидации данных, обработчика валидации и контроллера
authRouter.post(
  "/login",
  authValidation.loginValidation,
  handleValidationUtils,
  authController.login
);

// Настраиваем маршрут для регистрации
// Используем middleware для валидации данных, обработчика валидации и контроллера
authRouter.post(
  "/register",
  authValidation.registerValidation,
  handleValidationUtils,
  authController.register
);

// Настраиваем маршрут для получения токенов
authRouter.post("/get-tokens", authController.getTokens);

// Экспортируем роутер для использования в основном API роутере
export default authRouter;
