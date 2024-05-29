// Файл order.controller.js для контроля заказчиков

// Импорт модели заказов
import orderModel from "../models/order.model.js";

const orderController = {
  // Метод для создания нового заказа
  async createOrder(req, res) {
    try {
      const { data, address, fullName } = req.body; // Получаем данные заказа из тела запроса
      const { id } = req.userData; // Получаем идентификатор пользователя из данных авторизации
      const order = new orderModel({
        data,
        address,
        fullName,
        userId: id, // Связываем заказ с пользователем
      });

      // Сохраняем заказ в базе данных
      await order.save();

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Заказ успешно создан",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для получения всех заказов пользователя
  async getOrders(req, res) {
    try {
      const { id } = req.userData; // Получаем идентификатор пользователя из данных авторизации

      // Ищем заказы, связанные с пользователем
      const orders = await orderModel.find({ userId: id });

      // Возвращаем успешный ответ с найденными заказами
      return res.status(200).json({
        orders,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для получения конкретного заказа по идентификатору
  async getOrder(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор заказа из параметров URL

      // Ищем заказ по идентификатору
      const order = await orderModel.findOne({ _id: id });

      // Если заказ не найден, возвращаем сообщение об ошибке
      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      // Возвращаем успешный ответ с найденным заказом
      return res.status(200).json({
        order,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для обновления данных заказа
  async updateOrder(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор заказа из параметров URL
      const { data, address, fullName } = req.body; // Получаем обновленные данные заказа из тела запроса

      // Ищем заказ по идентификатору
      const order = await orderModel.findOne({ _id: id });

      // Если заказ не найден, возвращаем сообщение об ошибке
      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      // Обновляем данные заказа
      await order.updateOne({ data, address, fullName });

      // Сохраняем обновленный заказ в базе данных
      await order.save();

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Заказ успешно обновлен",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для удаления заказа
  async deleteOrder(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор заказа из параметров URL
      const { id: userId } = req.userData; // Получаем идентификатор пользователя из данных авторизации

      // Ищем и удаляем заказ по идентификатору
      const order = await orderModel.findOneAndDelete({ _id: id });

      // Если заказ не найден, возвращаем сообщение об ошибке
      if (!order) return res.status(404).json({ message: "Заказ не найден" });

      // Проверяем, принадлежит ли заказ пользователю
      if (order.userId !== userId)
        return res.status(403).json({ message: "Нет доступа" });

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Заказ успешно удален",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
};

// Экспортируем контроллер для использования в других частях приложения
export default orderController;
