const mongoose = require("mongoose");

const UserChallengeSchema = mongoose.Schema(
    {
        challengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
        },
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        endTime: {
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

const UserChallenge = mongoose.model("UserChallenge", UserChallengeSchema);

module.exports = UserChallenge;
