const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const authMiddleware = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  try {
    if (!token) {
      return res
        .status(403)
        .send({ message: "No token provided! Access Denied!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (e) {
    console.log(e);
  }
};

const auth = {
  authMiddleware,
};

module.exports = auth;
