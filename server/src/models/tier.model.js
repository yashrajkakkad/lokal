const mongoose = require("mongoose");

const TierSchema = mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      ref: "Store",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 0,
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
