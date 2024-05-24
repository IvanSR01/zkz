import orderModel from "../models/order.model.js";

const orderController = {
  async createOrder(req, res) {
    try {
      const { data, address, fullName } = req.body;
      const { id } = req.userData;
      const order = new orderModel({
        data,
        address,
				fullName,
        userId: id,
      });

      await order.save();

      return res.status(200).json({
        message: "Заказ успешно создан",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  async getOrders(req, res) {
    try {
      const { id } = req.userData;

      const orders = await orderModel.find({ userId: id });

      return res.status(200).json({
        orders,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  async getOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await orderModel.findOne({ _id: id });

      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      return res.status(200).json({
        order,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { data, address, fullName } = req.body;

      const order = await orderModel.findOne({ _id: id });

      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      await order.updateOne({ data, address, fullName });

      await order.save();

      return res.status(200).json({
        message: "Заказ успешно обновлен",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const { id: userId } = req.userData;

      const order = await orderModel.findOneAndDelete({ _id: id });

      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      if (order.userId !== userId)
        return res.status(403).json({ message: "Нет доступа" });

      return res.status(200).json({
        message: "Заказ успешно удален",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
};

export default orderController;
