const mongoose = require("mongoose");

const ChallengeTagSchema = mongoose.Schema(
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

const ChallengeTag = mongoose.model("ChallengeTag", ChallengeTagSchema);

module.exports = ChallengeTag;
