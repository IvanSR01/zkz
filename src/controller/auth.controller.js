import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import jwtUtils from "../utils/jwt.utils.js";

dotenv.config();

const authController = {
  async login(req, res) {
    try {
      const { login, password } = req.body;

      const user = await userModel.findOne({ email: login });

      if (!user)
        return res.status(403).json({
          message: "Логин или пароль неверны",
        });
      console;
      const isValidPass = await bcrypt.compare(password, user.password);

      if (!isValidPass)
        return res.status(403).json({
          message: "Логин или пароль неверны",
        });

      const { accessToken, refreshToken } = await jwtUtils.getNewTokens(
        user._id
      );

      return res.status(200).json({
        accessToken,
        refreshToken,
        ...user._doc,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async register(req, res) {
    try {
      const { fullName, email, number, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const oldUser = await userModel.findOne({ email: email });

      if (oldUser)
        return res.status(403).json({
          message: "Такой пользователь уже существует",
        });

      const user = new userModel({
        fullName,
        email,
				number,
        password: hash,
      });
      const savedUser = await user.save();

      const { accessToken, refreshToken } = await jwtUtils.getNewTokens(
        savedUser._id
      );

      return res.status(200).json({
        accessToken,
        refreshToken,
        ...savedUser._doc,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async getTokens(req, res) {
    try {
      const { refreshToken } = req.body;
      const { id } =  jwtUtils.verifyToken(refreshToken);
			console.log(id)
      const { accessToken, refreshToken: newRefreshToken } =
        await jwtUtils.getNewTokens(id);

      return res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
};
export default authController;
