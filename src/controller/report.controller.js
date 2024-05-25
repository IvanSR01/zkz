import reportModel from "../models/report.model.js";

const reportController = {
  // Метод для создания нового отчета
  async createReport(req, res) {
    try {
      const { id } = req.userData; // Получаем идентификатор пользователя из данных авторизации
      const { number, date, orderId } = req.body; // Получаем данные отчета из тела запроса

      // Создаем новый объект отчета
      const report = new reportModel({
        number: number,
        date,
        orderId,
        userId: id, // Связываем отчет с пользователем
      });

      // Сохраняем отчет в базе данных
      await report.save();

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Отчет успешно создан",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для получения всех отчетов
  async getReports(req, res) {
    try {
      const { id } = req.userData; // Получаем идентификатор пользователя из данных авторизации

      // Ищем все отчеты в базе данных
      const reports = await reportModel.find();

      // Возвращаем успешный ответ с найденными отчетами
      return res.status(200).json({
        reports,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для получения конкретного отчета по идентификатору
  async getReport(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор отчета из параметров URL

      // Ищем отчет по идентификатору
      const report = await reportModel.findOne({ _id: id });

      // Если отчет не найден, возвращаем сообщение об ошибке
      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      // Возвращаем успешный ответ с найденным отчетом
      return res.status(200).json({
        report,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для обновления отчета
  async updateReport(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор отчета из параметров URL
      const { number, date, orderId } = req.body; // Получаем обновленные данные отчета из тела запроса

      // Ищем отчет по идентификатору
      const report = await reportModel.findOne({ _id: id });

      // Если отчет не найден, возвращаем сообщение об ошибке
      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      // Обновляем данные отчета
      await report.updateOne({ number, date, orderId });

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Отчет успешно обновлен",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },

  // Метод для удаления отчета
  async deleteReport(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор отчета из параметров URL
      const { id: userId } = req.userData; // Получаем идентификатор пользователя из данных авторизации

      // Ищем и удаляем отчет по идентификатору
      const report = await reportModel.findOneAndDelete({ _id: id });

      // Если отчет не найден, возвращаем сообщение об ошибке
      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      // Проверяем, принадлежит ли отчет пользователю
      if (report.userId !== userId)
        return res.status(403).json({ message: "Нет доступа" });

      // Возвращаем успешный ответ
      return res.status(200).json({
        message: "Отчет успешно удален",
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
export default reportController;