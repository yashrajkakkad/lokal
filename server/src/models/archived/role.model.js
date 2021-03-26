const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
    {
        name: {
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

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
