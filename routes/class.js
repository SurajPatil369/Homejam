const router = require("express").Router({ mergeParams: true });
const { body, validationResult } = require("express-validator");

const { isAuth } = require("../middleware/isAuth");
const {
  createClass,
  getClasses,
  getClass,
  registerToClass,
  unregisterToClass,
} = require("../controllers/class");
const validateSchema = require("../middleware/validator");
const studentRoute = require("../routes/student");

//Re-route into other resource routers
router.use("/:classId/students", studentRoute);
router.use("/:classId/students/:studentId", studentRoute);

router.route("/").get(getClasses);
router.post(
  "/",
  [
    body("title", "please enter a title with minimum of 3 characters")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    body(
      "description",
      "please enter the description between 40 to 60 characters"
    )
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 40, max: 60 }),
    body("fees", "please enter fees")
      .trim()
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("fees should be number"),
    body("duration", "please enter duration").trim().not().isEmpty().toString(),
  ],
  isAuth,
  createClass
);
router
  .route("/:classId")
  .get(getClass)
  .post(isAuth, registerToClass)
  .put(isAuth, unregisterToClass);
module.exports = router;
