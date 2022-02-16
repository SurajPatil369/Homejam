const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const Class = require("../model/Class");
const generateError = require("../util/error");

//@desc   Create class
//@route  POST /api/v1/class
//@access Private

exports.createClass = asyncHandler(async(req, res, next) => {
  
  const { title, description, fees, duration, notes } = req.body;
  if (req.user.role != "instructor") {
    throw generateError("only instructor can create the class", 403);
  }

  const instructorName = req.user.name;
  const instructorEmail = req.user.email;
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
  res
    .status(200)
    .json({
      success: true,
      message: "class created successfully",
      data: course,
    });
});

//@desc   Get classes
//@route  GET /api/v1/class
//@access Public

exports.getClasses = asyncHandler(async(req, res, next) => {
  const classes=await Class.find();
  if (!classes){
    throw generateError('no class found',404)
  }
  res
    .status(200)
    .json({
      success: true,
      message: "classes fetched successfully",
      data: classes,
    });
});
