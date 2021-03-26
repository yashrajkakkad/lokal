const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hostId: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
    },
    description: {
      type: String,
    },
    tierIds: [
      {
        type: String,
        ref: "Tier",
      },
    ],
    cityName: {
      type: String,
    },
    phoneNumber: {
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

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
