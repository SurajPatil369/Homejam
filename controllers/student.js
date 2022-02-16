const asyncHandler = require("../middleware/async");
const {generateError} = require("../util/error");
const Class = require("../model/Class");
const User = require("../model/User");

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

  res.status(200).json({
    success: true,
    message: "students fetched successful",
    data: students,
  });
});
//@desc   Delete  student of class
//@route  DELETE /api/v1/class/:classId/students/:studentId
//@access Private

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const studentId=req.params.studentId;
  
  const classId=req.params.classId;
  if (req.user.role !== "instructor") {
      throw generateError('you are not authorized to access this route',401)
  }
  const course = await Class.findById(classId);
  const student= await User.findById(studentId);
  
  if (!course) {
    throw generateError("no course found matching to this id", 404);
  }
  if (!student){
    throw generateError("this student is not registered for this class",404);
  }
  course.students=course.students.filter(id=>id.toString()!==studentId)
  await course.save();
  student.classes=student.classes.filter(id=>id.toString()!==classId);
  await student.save();

  const students = course.students;
  
  res.status(200).json({
    success: true,
    message: "student removed from class",
    data: students,
  });
});
