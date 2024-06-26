// Этот файл содержит правила валидации для создания нового протокола.
// Импортируем модуль для валидации тела запросов из express-validator.

import { body } from "express-validator";

// Правила валидации для создания нового протокола
const createValidation = [
  // Проверяем, что поле title существует и заполнено
  body("title").exists().withMessage("Поле Название должно быть заполнено"),
  
  // Проверяем, что поле goal существует и заполнено
  body("goal").exists().withMessage("Поле Цель должно быть заполнено"),
  
  // Проверяем, что поле description существует и заполнено
  body("description").exists().withMessage("Поле Описание должно быть заполнено"),
  
  // Проверяем, что поле result существует и заполнено
  body("result").exists().withMessage("Поле Заключение должно быть заполнено"),
];

// Экспортируем правила валидации для использования в маршрутах
export { createValidation };
