const router=require('express').Router({mergeParams:true});
const {isAuth}= require('../middleware/isAuth');
const {getStudents}=require('../controllers/student');

router.route('/').get(isAuth,getStudents)

module.exports=router;