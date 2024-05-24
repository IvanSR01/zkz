import { body } from "express-validator";

const createValidation = [
  body("fullName")
    .exists()
    .withMessage("Поле Фио должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Фио"),
  body("address")
    .exists()
    .withMessage("Поле Адрес должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Адрес"),
  body("date")
    .exists()
    .withMessage("Поле Дата должно быть заполнено")
    .isDate()
    .withMessage("Тут должен быть Дата"),
];

export { createValidation };
