import mongoose from "mongoose";

const ProtocolSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
    },
    namesRows: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Protocol", ProtocolSchema);
