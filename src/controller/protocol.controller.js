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
      const { namesRows, rows, reportId } = req.body;
      const protocol = new protocolModel({
        namesRows,
        rows,
        reportId: reportId,
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
      const { namesRows, rows, reportId } = req.body;
      const protocol = await protocolModel.findOne({ _id: id });

      await protocol.updateOne({ namesRows, rows, reportId });

      return res.status(200).json({
        message: "Протокол успешно обновлен",
      });
    } catch (error) {}
  },
  async deleteProtocol(req, res) {
    try {
      const { id } = req.params;
      const protocol = await protocolModel.findOne({ _id: id });
      if (!protocol)
        return res.status(404).json({ message: "Протокол не найден" });
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
