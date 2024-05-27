// Импорт моделей протоколов и отчетов
import protocolModel from "../models/protocol.model.js";
import reportModel from "../models/report.model.js";
import orderModel from "../models/order.model.js";
import tableFileUtils from "../utils/table-file.utils.js";

const protocolController = {
  // Метод для получения всех протоколов по идентификатору отчета
  async getProtocols(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор отчета из параметров URL
      const protocols = await protocolModel.find({ reportId: id }); // Ищем все протоколы, связанные с отчетом
      return res.status(200).json({
        protocols,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для получения конкретного протокола по идентификатору
  async getById(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор протокола из параметров URL
      const protocol = await protocolModel.findOne({ _id: id }); // Ищем протокол по идентификатору
      return res.status(200).json({
        protocol,
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для создания нового протокола
  async createProtocol(req, res) {
    try {
      const {
        columns,
        rows,
        reportId,
        title,
        goal,
        description,
        result,
        methodology,
      } = req.body; // Получаем данные протокола из тела запроса
      const protocol = new protocolModel({
        columns,
        rows,
        reportId: reportId,
        title,
        goal,
        description,
        result,
        methodology,
      });
      const report = await reportModel.findOne({ _id: reportId }); // Ищем отчет по идентификатору

      // Если отчет не найден, возвращаем сообщение об ошибке
      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      // Добавляем протокол в массив протоколов отчета
      await report.updateOne({
        $push: { protocols: protocol },
      });

      // Сохраняем протокол в базе данных
      await protocol.save();
      return res.status(200).json({
        message: "Протокол успешно создан",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для обновления протокола
  async updateProtocol(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор протокола из параметров URL
      const {
        columns,
        rows,
        reportId,
        title,
        goal,
        description,
        result,
        methodology,
      } = req.body; // Получаем обновленные данные протокола из тела запроса
      const protocol = await protocolModel.findOne({ _id: id }); // Ищем протокол по идентификатору

      // Обновляем данные протокола
      await protocol.updateOne({
        columns,
        rows,
        reportId,
        title,
        goal,
        description,
        result,
        methodology,
      });

      return res.status(200).json({
        message: "Протокол успешно обновлен",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  // Метод для удаления протокола
  async deleteProtocol(req, res) {
    try {
      const { id } = req.params; // Получаем идентификатор протокола из параметров URL
      const protocol = await protocolModel.findOneAndDelete({ _id: id }); // Ищем и удаляем протокол по идентификатору

      // Если протокол не найден, возвращаем сообщение об ошибке
      if (!protocol)
        return res.status(404).json({ message: "Протокол не найден" });

      const report = await reportModel.findOne({ _id: protocol.reportId }); // Ищем отчет, связанный с протоколом

      // Если отчет не найден, возвращаем сообщение об ошибке
      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      // Удаляем протокол из массива протоколов отчета
      await report.updateOne({
        $pull: { protocols: protocol },
      });

      // Удаляем протокол из базы данных
      await protocol.remove();
      return res.status(200).json({
        message: "Протокол успешно удален",
      });
    } catch (error) {
      // Логируем ошибку и возвращаем сообщение об ошибке
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
  async generateExcel(req, res) {
    try {
      const { id } = req.body;

      const protocol = await protocolModel.findOne({ _id: id });

      if (!protocol)
        return res.status(404).json({ message: "Протокол не найден" });
      const report = await reportModel.findById(protocol.reportId);
      const order = await orderModel.findById(report.orderId);
      protocol.rows.unshift(protocol.columns);
      tableFileUtils({ report, order, protocol });
      return res.json({
        message: "Файл успешно сгенерирован",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
};

// Экспортируем контроллер для использования в других частях приложения
export default protocolController;
