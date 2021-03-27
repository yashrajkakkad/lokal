const mongoose = require("mongoose");

const TierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    minValue: {
      type: Number,
      default: 0,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Tier = mongoose.model("Tier", TierSchema);

module.exports = Tier;
