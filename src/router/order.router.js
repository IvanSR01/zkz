// Этот файл предназначен для настройки маршрутов для работы с заказами в приложении.
// Импортируем необходимые модули, middleware, контроллеры и валидации.

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import orderController from "../controller/order.controller.js";
import { createValidation } from "../validation/order.validation.js";
import handleValidationUtils from "../utils/handle-validation.utils.js";

// Создаем роутер для работы с заказами
const orderRouter = Router();

// Настраиваем маршрут для получения всех заказов
// Используем middleware для аутентификации и контроллер для обработки запроса
orderRouter.get("/all", authMiddleware, orderController.getOrders);

// Настраиваем маршрут для получения заказа по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
orderRouter.get("/by-id/:id", authMiddleware, orderController.getOrder);

// Настраиваем маршрут для создания нового заказа
// Используем middleware для валидации данных, обработчика валидации, аутентификации и контроллера
orderRouter.post(
  "/new",
  createValidation,
  handleValidationUtils,
  authMiddleware,
  orderController.createOrder
);

// Настраиваем маршрут для обновления заказа по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
orderRouter.put("/update/:id", authMiddleware, orderController.updateOrder);

// Настраиваем маршрут для удаления заказа по ID
// Используем middleware для аутентификации и контроллер для обработки запроса
orderRouter.delete("/delete/:id", authMiddleware, orderController.deleteOrder);

// Экспортируем роутер для использования в основном API роутере
export default orderRouter;
