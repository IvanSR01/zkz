// Этот файл содержит правила валидации для создания нового объекта.
// Импортируем модуль для валидации тела запросов из express-validator.

import { body } from "express-validator";

// Правила валидации для создания нового объекта
const createValidation = [
  // Проверяем, что поле name существует, заполнено и является строкой
  body("name")
    .exists()
    .withMessage("Поле Название и номер должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Номер"),

  // Проверяем, что поле date существует, заполнено и является датой
  body("date")
    .exists()
    .withMessage("Поле Дата должно быть заполнено")
    .isDate()
    .withMessage("Тут должна быть Дата"),

  // Проверяем, что поле company существует и заполнено
  body("company").exists().withMessage("Поле компания должно быть заполнено"),

  // Проверяем, что поле subCompany существует и заполнено
  body("subCompany")
    .exists()
    .withMessage("Поле подкомпания должно быть заполнено"),

  // Проверяем, что поле object существует и заполнено
  body("object").exists().withMessage("Поле обьект должно быть заполнено"),

  // Проверяем, что поле addressObject существует и заполнено
  body("addressObject")
    .exists()
    .withMessage("Поле адрес обьекта должно быть заполнено"),

  body("dateLicense")
    .exists()
    .withMessage("Поле дата лицензии должно быть заполнено"),
  body("dateOverLicense")
    .exists()
    .withMessage("Поле дата окончания лицензии должно быть заполнено"),
];

// Экспортируем правила валидации для использования в маршрутах
export { createValidation };
