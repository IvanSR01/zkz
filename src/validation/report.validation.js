
import { body } from "express-validator";

const createValidation = [
  body("number")
    .exists()
    .withMessage("Поле Номер должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Номер"),
  body("date")
    .exists()
    .withMessage("Поле Дата должно быть заполнено")
    .isDate()
    .withMessage("Тут должен быть Дата"),
];

export { createValidation };
