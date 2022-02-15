const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const generateError = require("../util/error");
const User = require("../model/User");
const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.get("Authorization");
  if (!token) {
    throw generateError("not authorized", 401);
  }
  const decodedToken = jwt.verify(token, "secret_key");
  if (!decodedToken) {
    throw generateError("not authorized", 401);
  }
  const userId = decodedToken.userId;
  const user = await User.findById(userId);
  req.user = user;
  next();
});
module.exports=isAuth;