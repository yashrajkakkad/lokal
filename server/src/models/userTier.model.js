const mongoose = require("mongoose");

// Schema for storing total amount spend by a user at a particular store.
const UserTierSchema = mongoose.Schema(
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
        totalAmount: {
            type: Number,
            default: 0,
        },
        tier: {
            type: Number,
            required: true,
            ref: "Tier",
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const UserTier = mongoose.model("UserTier", UserTierSchema);

module.exports = UserTier;
