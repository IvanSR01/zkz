import mongoose from "mongoose";

const ProtocolSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    methodology: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Protocol", ProtocolSchema);
