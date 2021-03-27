const UserModel = require("../models/user.model");
const config = require("../configs/auth.config");
const jwt = require("jwt-simple");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({
      error: "username or password not passed",
    });
  }

  UserModel.findOne({ username }, async (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).json({
        error: "username already exists",
      });
    }

    const user = new UserModel(req.body);

    user.save(async (err) => {
      if (err) {
        return next(err);
      }

      const token = await user.generateAuthToken();
      res.json({
        user,
        token,
      });
    });
  });
};
