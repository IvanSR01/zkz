// Этот файл предназначен для настройки маршрутов для работы с протоколами в приложении.
// Импортируем необходимые модули, middleware, контроллеры и валидации.

import { Router } from "express";
import protocolController from "../controller/protocol.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createValidation } from "../validation/protocol.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";

// Создаем роутер для работы с протоколами
const protocolRouter = Router();

// Настраиваем маршрут для получения протоколов по ID отчета
// Используем middleware для аутентификации и контроллер для обработки запроса
protocolRouter.get(
  "/by-report/:id",
  authMiddleware,
  protocolController.getProtocols
);

// Настраиваем маршрут для получения протокола по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
protocolRouter.get("/by-id/:id", authMiddleware, protocolController.getById);

// Настраиваем маршрут для создания нового протокола
// Используем middleware для валидации данных, обработчика валидации, аутентификации и контроллера
protocolRouter.post(
  "/create",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  protocolController.createProtocol
);

// Настраиваем маршрут для генерации таблицы (DOC)
// Пока что без использования middleware для аутентификации
protocolRouter.post(
  "/gen-table",
  // authMiddleware,
  protocolController.generateDocFiles
);

// Настраиваем маршрут для обновления протокола по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
protocolRouter.put(
  "/update/:id",
  authMiddleware,
  protocolController.updateProtocol
);

// Настраиваем маршрут для удаления протокола по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
protocolRouter.delete(
  "/delete/:id",
  authMiddleware,
  protocolController.deleteProtocol
);

// Экспортируем роутер для использования в основном API роутере
export default protocolRouter;
