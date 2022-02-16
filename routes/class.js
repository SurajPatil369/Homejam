const router = require("express").Router();
const { isAuth } = require("../middleware/isAuth");
const { createClass,getClasses ,getClass} = require("../controllers/class");

router.route("/").get(getClasses).post(isAuth, createClass);
router.route("/:classId").get(getClass)
module.exports = router;
