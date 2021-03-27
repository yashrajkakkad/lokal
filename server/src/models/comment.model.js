const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        creatorId: {
            type: Number,
            required: true,
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

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
