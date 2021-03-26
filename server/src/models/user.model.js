const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        cityName: {
            type: String,
        },
        countryName: {
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
