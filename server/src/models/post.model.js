const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        creatorId: {
            type: String,
            required: true,
            ref: "User",
        },
        storeId : {
            type: String,
            required: true,
            ref: "Store",
        },
        commentIds: [
            {
                commentId: {
                    type: Number,
                    required: true,
                    ref: "Comment",
                },    
            },
        ],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
