// Этот файл предназначен для настройки middleware для аутентификации в приложении.
// Импортируем необходимые модули и утилиты.

import jwtUtils from "../utils/jwt.utils.js";

// Middleware для проверки аутентификации пользователя
const authMiddleware = (req, res, next) => {
  // Разрешаем OPTIONS запросы без проверки
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // Извлекаем токен из заголовков авторизации
    const token = req.headers.authorization?.split(" ")[1];

    // Проверяем наличие токена
    if (!token) {
      return res.status(400).json({
        message: "Пользователь не авторизован", // Сообщение о неавторизованном доступе
      });
    }

    // Верифицируем токен и декодируем данные
    const decodedData = jwtUtils.verifyToken(token);

    // Сохраняем декодированные данные в объект запроса для дальнейшего использования
    req.userData = decodedData;

    // Передаем управление следующему middleware или маршруту
    next();
  } catch (error) {
    // Обрабатываем ошибки и отправляем ответ с сообщением об ошибке
    return res.status(403).json({
      message: `${error?.message ? error?.message : "Пользователь не авторизован"}`, // Сообщение о неавторизованном доступе
    });
  }
};

// Экспортируем middleware для использования в маршрутах
export default authMiddleware;
