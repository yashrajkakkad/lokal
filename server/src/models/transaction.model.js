const mongoose = require("mongoose");

const transactionType = Object.freeze({
  CASH: "cash",
  CARD: "card",
  CREDIT: "credit",
});

const transactionStatusType = Object.freeze({
  FAILED: "failed",
  SUCCEEDEED: "succeeded",
});

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
    type: {
      type: String,
      enum: Object.values(transactionType),
    },
    status: {
      type: String,
      enum: Object.values(transactionStatusType),
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
