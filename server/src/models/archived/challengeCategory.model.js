const mongoose = require("mongoose");

const ChallengeCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const ChallengeCategory = mongoose.model(
    "ChallengeCategory",
    ChallengeCategorySchema
);

module.exports = ChallengeCategory;
