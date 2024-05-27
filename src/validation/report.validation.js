import { body } from "express-validator";

const createValidation = [
  body("name")
    .exists()
    .withMessage("Поле Название и номер должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Номер"),
  body("date")
    .exists()
    .withMessage("Поле Дата должно быть заполнено")
    .isDate()
    .withMessage("Тут должен быть Дата"),
  body("company").exists().withMessage("Поле компания должно быть заполнено"),
  body("subCompany")
    .exists()
    .withMessage("Поле подкомпания должно быть заполнено"),
  body("object").exists().withMessage("Поле обьект должно быть заполнено"),
  body("addressObject")
    .exists()
    .withMessage("Поле адрес обьекта должно быть заполнено"),
];

export { createValidation };
