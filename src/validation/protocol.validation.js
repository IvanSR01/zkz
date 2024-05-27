import { body } from "express-validator";


const createValidation = [
	body("title").exists().withMessage("Поле Название должно быть заполнено"),
	body("goal").exists().withMessage("Поле Цель должно быть заполнено"),
	body("description").exists().withMessage("Поле Описание должно быть заполнено"),
	body("result").exists().withMessage("Поле Заключение должно быть заполнено"),
]

export { createValidation }