const router = require("express").Router()
const {register,login,logout}=require('../controllers/user');
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
// route.get('/me',getUser)

module.exports=router;