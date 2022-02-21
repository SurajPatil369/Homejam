const router = require("express").Router({ mergeParams: true });
const { body, validationResult } = require("express-validator");
const { isAuth } = require("../middleware/isAuth");
const {
  createClass,
  getClasses,
  getClass,
  registerToClass,
  unregisterToClass,
  addNotes
} = require("../controllers/class");

const studentRoute = require("./student");
const { validateClassSchema } = require("../middleware/validator");

//Re-route into other resource routers
router.use("/:classId/students", studentRoute);
router.use("/:classId/students/:studentId", studentRoute);

router
  .route("/")
  .get(getClasses)
  .post(validateClassSchema, isAuth, createClass);

router
  .route("/:classId")
  .get(getClass)
  .post(isAuth, registerToClass)
  .put(isAuth, unregisterToClass);

router.route("/:classId/notes").put(isAuth,addNotes);
module.exports = router;
