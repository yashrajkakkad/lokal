const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      ref: "Store",
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
