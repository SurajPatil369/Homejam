const router = require("express").Router();
const { isAuth } = require("../middleware/isAuth");
const { createClass,getClasses } = require("../controllers/class");

router.route("/").get(getClasses).post(isAuth, createClass);

module.exports = router;
