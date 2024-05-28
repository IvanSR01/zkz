// Импортируем функцию validationResult из библиотеки 'express-validator'
import { validationResult } from 'express-validator';

// Экспортируем middleware функцию по умолчанию
export default (req, res, next) => {
  // Получаем результаты валидации из объекта запроса
  const errors = validationResult(req);

  // Проверяем, есть ли ошибки в валидации
  if (!errors.isEmpty()) {
    // Если ошибки присутствуют, возвращаем ответ с статусом 400 (Bad Request)
    // и массивом ошибок в формате JSON
    return res.status(400).json(errors.array());
  }

  // Если ошибок нет, передаем управление следующему middleware
  next();
};
