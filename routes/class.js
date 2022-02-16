const router = require("express").Router({ mergeParams: true });
const { isAuth } = require("../middleware/isAuth");
const {
  createClass,
  getClasses,
  getClass,
  registerToClass,
  unregisterToClass,
} = require("../controllers/class");

const studentRoute = require("../routes/student");

router.use("/:classId/students", studentRoute);
router.use("/:classId/students/:studentId", studentRoute);

router.route("/").get(getClasses).post(isAuth, createClass);
router
  .route("/:classId")
  .get(getClass)
  .post(isAuth, registerToClass)
  .put(isAuth, unregisterToClass);
module.exports = router;
