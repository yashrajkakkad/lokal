const mongoose = require("mongoose");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
// const { UserTypeEnum } = require("../enums/user.enum");

const userType = Object.freeze({
  MEMBER: "member",
  HOST: "host",
});

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
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(userType),
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  }, // credit, ownedStoreIds - default NULL
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  console.log(user);
  if (!user) {
    throw new Error("No user found");
  }

  decryptedPassword = crypto.AES.decrypt(user.password, config.secret).toString(
    crypto.enc.Utf8
  );
  console.log(decryptedPassword);

  if (decryptedPassword != password) {
    throw new Error("Password did not match");
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Hash plain text password before saving

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = crypto.AES.encrypt(user.password, config.secret).toString();
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
