import userModel from "../models/user.model.js";

const userController = {
  async getProfile(req, res) {
    try {
      const { id } = req.userData;

      const user = await userModel.findOne({ _id: id });

      if (!user)
        return res.status(404).json({ message: "Пользователь не найден" });

      return res.status(200).json({
        ...user._doc,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
};

export default userController;
