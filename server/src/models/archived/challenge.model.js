const mongoose = require("mongoose");

const ChallengeSchema = mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        members: [
            {
                type: String,
            },
        ],
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChallengeCategory",
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ChallengeTag",
            },
        ],
        rating: {
            type: Number,
        },
        endDate: {
            type: Date,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;
