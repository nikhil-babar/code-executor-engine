const mongoose = require("mongoose");

const outputSchema = new mongoose.Schema(
  {
    submit_id: {
      type: String,
      required: true,
      unique: true,
    },
    filename: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    output: {
      type: String,
    },
    status: {
      type: Number,
      min: 100,
      max: 500
    }
  },
  {
    timestamps: true,
  }
);

const Output = mongoose.model("Output", outputSchema);

module.exports = Output;
