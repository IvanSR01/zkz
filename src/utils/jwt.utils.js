// Этот файл содержит утилиты для работы с JWT токенами.
// Импортируем необходимые модули и конфигурацию окружения.

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения из .env файла

const jwtUtils = {
  // Функция для генерации новых JWT токенов (access и refresh)
  async getNewTokens(id) {
    // Данные для включения в токен
    const data = { id: id };

    // Создаем access токен, который истекает через 1 час
    const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Создаем refresh токен, который истекает через 15 дней
    const refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '15d',
    });

    // Возвращаем созданные токены
    return {
      accessToken,
      refreshToken,
    };
  },

  // Функция для проверки и верификации токена
  verifyToken(token) {
    // Верифицируем токен с использованием секретного ключа из переменных окружения
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};

// Экспортируем объект с функциями для использования в других модулях
export default jwtUtils;
