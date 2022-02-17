const { body, validationResult } = require("express-validator");

const validateClassSchema = [
  body("title", "please enter a title with minimum of 3 characters")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .isString()
    .withMessage("user name must be a string"),
  body(
    "description",
    "please enter the description between 40 to 60 characters"
  )
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 40, max: 60 }),
  body("fees", "please enter a fees")
    .trim()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("fees should be number"),
  body("duration", "please enter duration").trim().not().isEmpty(),
];

const validateUserSchema = [
  body("name", "name required")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .isString()
    .withMessage("user name must be a string"),
  body("mail", "valid email required")
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("please enter a valid email")
    .normalizeEmail(),
  body("role", "role required").trim().not().isEmpty(),
  body("password", "password required")
    .trim()
    .not()
    .isEmpty()
    .isAlphanumeric()
    .withMessage("password must contain numbers and alphabets")
    .isLength({ min: 5 })
    .withMessage("password must be of 5 character long"),
];

module.exports = { validateClassSchema, validateUserSchema };
