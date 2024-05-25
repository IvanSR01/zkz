import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import jwtUtils from "../utils/jwt.utils.js";

// Загружаем переменные среды из файла .env
dotenv.config();

const authController = {
  // Метод для входа пользователя
  async login(req, res) {
    try {
      const { login, password } = req.body; // Получаем логин и пароль из тела запроса

      // Ищем пользователя в базе данных по email
      const user = await userModel.findOne({ email: login });

      // Если пользователь не найден, возвращаем ошибку
      if (!user)
        return res.status(403).json({
          message: "Логин или пароль неверны",
        });

      // Сравниваем введенный пароль с хешированным паролем в базе данных
      const isValidPass = await bcrypt.compare(password, user.password);

      // Если пароль неверный, возвращаем ошибку
      if (!isValidPass)
        return res.status(403).json({
          message: "Логин или пароль неверны",
        });

      // Генерируем новые токены доступа и обновления
      const { accessToken, refreshToken } = await jwtUtils.getNewTokens(
        user._id
      );

      // Возвращаем успешный ответ с токенами и данными пользователя
      return res.status(200).json({
        accessToken,
        refreshToken,
        ...user._doc,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для регистрации нового пользователя
  async register(req, res) {
    try {
      const { fullName, email, number, password } = req.body; // Получаем данные из тела запроса
      const salt = await bcrypt.genSalt(10); // Генерируем соль для хеширования пароля
      const hash = await bcrypt.hash(password, salt); // Хешируем пароль

      // Проверяем, существует ли пользователь с таким email
      const oldUser = await userModel.findOne({ email: email });

      // Если пользователь существует, возвращаем ошибку
      if (oldUser)
        return res.status(403).json({
          message: "Такой пользователь уже существует",
        });

      // Создаем новый объект пользователя
      const user = new userModel({
        fullName,
        email,
        number,
        password: hash, // Сохраняем хешированный пароль
      });
      const savedUser = await user.save(); // Сохраняем пользователя в базе данных

      // Генерируем новые токены доступа и обновления для нового пользователя
      const { accessToken, refreshToken } = await jwtUtils.getNewTokens(
        savedUser._id
      );

      // Возвращаем успешный ответ с токенами и данными сохраненного пользователя
      return res.status(200).json({
        accessToken,
        refreshToken,
        ...savedUser._doc,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для получения новых токенов доступа и обновления
  async getTokens(req, res) {
    try {
      const { refreshToken } = req.body; // Получаем refresh-токен из тела запроса
      const { id } = jwtUtils.verifyToken(refreshToken); // Проверяем и декодируем refresh-токен

      // Генерируем новые токены доступа и обновления
      const { accessToken, refreshToken: newRefreshToken } =
        await jwtUtils.getNewTokens(id);

      // Возвращаем успешный ответ с новыми токенами
      return res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
};

// Экспортируем контроллер для использования в других частях приложения
export default authController;