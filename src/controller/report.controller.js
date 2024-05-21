const reportController = {
  async createReport(req, res) {
    try {
      const { id } = req.userData;
      const { data } = req.body;
      const report = new reportModel({
        data,
        userId: id,
      });
      await report.save();
      return res.status(200).json({
        message: "Отчет успешно создан",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async getReports(req, res) {
    try {
      const { id } = req.userData;
      const reports = await reportModel.find();
      return res.status(200).json({
        reports,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async getReport(req, res) {
    try {
      const { id } = req.params;
      const report = await reportModel.findOne({ _id: id });
      if (!report) return res.status(404).json({ message: "Отчет не найден" });
      return res.status(200).json({
        report,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async updateReport(req, res) {
    try {
      const { id } = req.params;
      const { date, protocolsId } = req.body;

      const report = await reportModel.findOne({ _id: id });

      if (!report) return res.status(404).json({ message: "Отчет не найден" });

      const protocols = await protocolModel.find({ _id: protocolsId });
      await report.updateOne({ date, protocols });

      return res.status(200).json({
        message: "Отчет успешно обновлен",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
  async deleteReport(req, res) {
    try {
      const { id } = req.params;
      const { id: userId } = req.userData;
      const report = await reportModel.findOne({ _id: id });
      if (!report) return res.status(404).json({ message: "Отчет не найден" });
      if (report.userId !== userId)
        return res.status(403).json({ message: "Нет доступа" });
      await report.remove();
      return res.status(200).json({
        message: "Отчет успешно удален",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Что-то пошло не так",
      });
    }
  },
};

export default reportController;