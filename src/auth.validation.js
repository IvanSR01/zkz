import { body } from "express-validator";

const registerValidation = [
  body("email")
    .exists()
    .withMessage("Поле Email должно быть заполнено")
    .isEmail()
    .withMessage("Тут должен быть Email"),

  body("password")
    .exists()
    .withMessage("Поле Пароль должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Пароль")
    .isLength({ min: 5 })
    .withMessage("Пароль должен содержать минимум 5 символов"),

  body("fullName")
    .exists()
    .withMessage("Поле Фио должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Фио"),

  body("number")
    .exists()
    .withMessage("Поле номер удостоверение должно быть заполнено")
    .isString()
    .withMessage(""),
];

const loginValidation = [
  body("email")
    .exists()
    .withMessage("Поле Email должно быть заполнено")
    .isEmail()
    .withMessage("Тут должен быть Email"),

  body("password")
    .exists()
    .withMessage("Поле Пароль должно быть заполнено")
    .isString()
    .withMessage("Тут должен быть Пароль")
    .isLength({ min: 5 })
    .withMessage("Пароль должен содержать минимум 5 символов"),
];

export default {
  loginValidation,
  registerValidation,
};
