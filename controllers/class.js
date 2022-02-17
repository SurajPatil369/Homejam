const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const Class = require("../model/Class");
const { generateError } = require("../util/error");
const { validationResult } = require('express-validator');
//@desc   Create class
//@route  POST /api/v1/class
//@access Private

exports.createClass = asyncHandler(async (req, res, next) => {
  const error = validationResult(req)
  console.log(error)
  if (!error.isEmpty()){
    throw generateError(error.array()[0].msg,400)
  }
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  const { title, description, fees, duration, notes } = req.body;
  if (req.user.role != "instructor") {
    throw generateError("only instructor can create the class", 403);
  }

  const instructorName = user.name;
  const instructorEmail = user.email;
  let course = new Class({
    title: title,
    description: description,
    fees: fees,
    duration: duration,
    notes: notes,
    instructor: {
      name: instructorName,
      email: instructorEmail,
    },
  });
  course = await course.save();
  if (!course) {
    throw generateError("class can not be created at moment", 409);
  }

  res.status(200).json({
    success: true,
    message: "class created successfully",
    data: course,
  });
});

//@desc   Get all classes
//@route  GET /api/v1/class
//@route  GET /api/v1/user/me/:userId/classes'
//@access Public/Private

exports.getClasses = asyncHandler(async (req, res, next) => {
  let courses;
  let userId = req.params.userId;
  console.log(userId)
  if (userId) {
    const user = await User.findById(userId).populate('classes');
    console.log(user)
    const userObj = { name: user.name, email: user.email };
    if (user.role === "instructor") {
      courses = await Class.find({instructor: userObj }).select('-instructor');
      console.log("instructor:",courses);
    } else if (user.role === "student") {
      courses = user.classes;
    }
  } else {
    courses = await Class.find().populate("students", "name");
  }

  if (!courses) {
    throw generateError("no class found", 404);
  }

  res.status(200).json({
    success: true,
    message: "classes fetched successfully",
    data: courses,
  });
});

//@desc   Get class
//@route  GET /api/v1/class/:classId
//@access Public

exports.getClass = asyncHandler(async (req, res, next) => {
  const course = await Class.findById(req.params.classId);
  if (!course) {
    throw generateError("no class found matching to this id", 404);
  }
  res.status(200).json({
    success: true,
    message: "classes fetched successfully",
    data: course,
  });
});

//@desc    register to class
//@route  POST /api/v1/class/:classId
//@access Public

exports.registerToClass = asyncHandler(async (req, res, next) => {
  const course = await Class.findById(req.params.classId);
  let userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) {
    throw generateError("no user found matching to this id", 404);
  }
  if (!course) {
    throw generateError("no class found matching to this id", 404);
  }
  if (user.role !== "student") {
    throw generateError("only student can register to the class", 401);
  }
  if (course.students.includes(user._id.toString())) {
    throw generateError("you have already registered to this class", 409);
  }
  course.students.push(userId);
  await course.save();

  user.classes.push(course._id.toString());
  await user.save();

  res.status(200).json({
    success: true,
    message: "you have registered successfully to this course",
    data: [course, user],
  });
});

//@desc    unregister to class
//@route  PUT /api/v1/class/:classId
//@access Private

exports.unregisterToClass = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;
  const course = await Class.findById(classId);
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) {
    throw generateError("no user found matching to this id", 404);
  }
  if (!course) {
    throw generateError("no class found matching to this id", 404);
  }

  if (!course.students.includes(user._id.toString())) {
    throw generateError("you are not registered to this class", 409);
  }

  course.students = course.students.filter(
    (studentId) => studentId.toString() !== userId
  );
  await course.save();

  user.classes = user.classes.filter((id) => id.toString() !== classId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "you have unregistered to this course",
    data: [course, user],
  });
});
