const { body, validationResult } = require("express-validator");

// const validateMethod = (method) => {
//   switch (method) {
//   case "createClass": {
//   return [
//     body("title", "please enter a title with minimum of 3 characters")
//       .trim()
//       .not()
//       .isEmpty()
//       .isLength({ min: 3 }),
//     body(
//       "description",
//       "please enter the description between 40 to 60 characters"
//     )
//       .trim()
//       .not()
//       .isEmpty()
//       .isLength({ min: 40, max: 60 }),
//     body("fees", "please enter fees")
//       .trim()
//       .not()
//       .isEmpty()
//       .isNumeric()
//       .withMessage("fees should be number"),
//     body("duration", "please enter duration").trim().not().isEmpty().toString(),
//   ];
// };
//   case "register": {
//     return [
//       body("name", "user name should be atleast between 3 char to 20 char")
//         .trim()
//         .not()
//         .isEmpty()
//         .isLength({ min: 3, max: 20 })
//         .isString()
//         .withMessage("user name must be a string"),
//       body("mail", "email required")
//         .trim()
//         .not()
//         .isEmpty()
//         .isEmail()
//         .withMessage("please enter valid email"),
//       body("role", "role required").trim().not().isEmpty(),
//       body("password", "password required")
//         .trim()
//         .not()
//         .isEmpty()
//         .isAlphanumeric()
//         .withMessage("password must contain numbers and alphabets")
//         .isLength({ min: 5 })
//         .withMessage("password must be of 5 character long"),
//     ];
//   }
// }
// };
 const validateSchema = [
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
];
// const validate = (req, res, next) => {
//   let errors = validationResult(req);

//   next();
// };


module.exports=validateSchema