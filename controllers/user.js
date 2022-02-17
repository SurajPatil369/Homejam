const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const { generateError } = require("../util/error");
const { encryptPassword } = require("../util/encryptPassword");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//@desc   register user
//@route  POST /api/v1/user/register
//@access Public

exports.register = asyncHandler(async (req, res, next) => {
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    throw generateError(error.array()[0].msg, 400);
  }
  const { name, email, role, password } = req.body;
  const isUserAvailable = await User.findOne({ email: email });
  console.log(isUserAvailable);
  if (isUserAvailable) {
    throw generateError("user already exist", 409);
  }
  const encryptedPassword = await encryptPassword(password);
  const user = new User({
    name: name,
    email: email,
    role: role,
    password: encryptedPassword,
  });
  await user.save();

  res.status(200).json({
    success: true,
    message: "user registered successfully",
    data: user,
  });
});

//@desc   login user
//@route  GET /api/v1/user/login
//@access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    throw generateError("no user found matching to this mail", 404);
  }
  const isSame = await bcryptjs.compare(password, user.password);
  if (!isSame) {
    throw generateError("please enter valid password", 401);
  }
  const data = {
    email: email,
    userId: user._id.toString(),
  };
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  const options = {
    expires: new Date(Date.now() + process.env.EXPIRES * 60 * 60 * 24 * 7),
    httpOnly: true,
  };
  res.cookie("token", token, options).status(200).json({
    success: true,
    message: "login successful",
    token: token,
    userId: user._id.toString(),
  });
});

//@desc   login user
//@route  GET /api/v1/user/logout
//@access Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "logout successful", data: {} });
});

//desc get getUser
//@route GET /api/v1/user/me

exports.getUser = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const userId = req.user._id.toString();
  const user = await User.findById(userId).populate(
    "classes",
    "title instructor"
  );
  if (!user) {
    throw generateError("could not found user details", 404);
  }
  res
    .status(200)
    .json({ success: true, message: "fetched user data", data: user });
});
