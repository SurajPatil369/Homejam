const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const generateError = require("../util/error");
const User = require("../model/User");

exports.isAuth = asyncHandler(async (req, res, next) => {
  let token = req.get("cookie");
  token = token.split("=");
  token = token[1];
  if (!token) {
    throw generateError("not authorized", 401);
  }
  try {
    const decodedToken = jwt.verify(token, "secret_key");
    if (!decodedToken) {
      throw generateError("not authorized", 401);
    }
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
});
