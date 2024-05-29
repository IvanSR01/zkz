// Этот файл предназначен для настройки маршрутов для работы с отчетами в приложении.
// Импортируем необходимые модули, middleware, контроллеры и валидации.

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import reportController from "../controller/report.controller.js";
import { createValidation } from "../validation/report.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";

// Создаем роутер для работы с отчетами
const reportRouter = Router();

// Настраиваем маршрут для получения всех отчетов
// Используем middleware для аутентификации и контроллер для обработки запроса
reportRouter.get("/all", authMiddleware, reportController.getReports);

// Настраиваем маршрут для получения отчета по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
reportRouter.get("/by-id/:id", authMiddleware, reportController.getReport);

// Настраиваем маршрут для создания нового отчета
// Используем middleware для валидации данных, обработчика валидации, аутентификации и контроллера
reportRouter.post(
  "/create",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  reportController.createReport
);

// Настраиваем маршрут для обновления отчета по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
reportRouter.put("/update/:id", authMiddleware, reportController.updateReport);

// Настраиваем маршрут для удаления отчета по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
reportRouter.delete(
  "/delete/:id",
  authMiddleware,
  reportController.deleteReport
);

// Экспортируем роутер для использования в основном API роутере
export default reportRouter;
