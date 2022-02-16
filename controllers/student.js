const asyncHandler = require("../middleware/async");
const {generateError} = require("../util/error");
const Class = require("../model/Class");
const User = require("../model/Class");

//@desc   Get all students of class
//@route  GET /api/v1/class/:classId/students
//@access Private

exports.getStudents = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "instructor") {
      throw generateError('you are not authorized to access this route',401)
  }
  const course = await Class.findById(req.params.classId).populate(
    "students",
    "name email _id"
  );
  if (!course) {
    throw generateError("no course found matching to this id", 404);
  }
  const students = course.students;
  if (students.length < 1) {
    throw generateError("no student has registered to this course");
  }

  res.json({
    success: true,
    message: "students fetched successful",
    data: students,
  });
});
