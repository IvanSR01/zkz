import protocolModel from "../models/protocol.model.js";
import reportModel from "../models/report.model.js";

const protocolController = {
  async getProtocols(req, res) {
    try {
      const { id } = req.params;
      const protocols = await protocolModel.find({ reportId: id });
      return res.status(200).json({
        protocols,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const protocol = await protocolModel.findOne({ _id: id });
      return res.status(200).json({
        protocol,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
  async createProtocol(req, res) {
    try {
      const { columns, rows, reportId } = req.body;
      const protocol = new protocolModel({
        columns,
        rows,
        reportId: reportId,
      });
      const report = await reportModel.findOne({ _id: '664f3abad99436305977516e' });

      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      await report.updateOne({
        $push: { protocols: protocol },
      });

      await protocol.save();
      return res.status(200).json({
        message: "Протокол успешно создан",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
  async updateProtocol(req, res) {
    try {
      const { id } = req.params;
      const { columns, rows, reportId } = req.body;
      const protocol = await protocolModel.findOne({ _id: id });

      await protocol.updateOne({ columns, rows, reportId });

      return res.status(200).json({
        message: "Протокол успешно обновлен",
      });
    } catch (error) {}
  },
  async deleteProtocol(req, res) {
    try {
      const { id } = req.params;
      const protocol = await protocolModel.findOneAndDelete({ _id: id });
      if (!protocol)
        return res.status(404).json({ message: "Протокол не найден" });

      const report = await reportModel.findOne({ _id: protocol.reportId });

      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      await report.updateOne({
        $pull: { protocols: protocol },
      });

      await protocol.remove();
      return res.status(200).json({
        message: "Протокол успешно удален",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Что-то пошло не так" });
    }
  },
};

export default protocolController;
