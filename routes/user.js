const router = require("express").Router()
const {register,login,logout,getUser}=require('../controllers/user');
const {isAuth}=require('../middleware/isAuth');
const classRoute=require('./class');
// const {validate,validationResults}=require('../middleware/validator')
//Re-route into other resource routers
router.use('/me/:userId/classes',isAuth,classRoute)

// router.post('/register',validate('register'),validationResults,register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isAuth,getUser)

module.exports=router;