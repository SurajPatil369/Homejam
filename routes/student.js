const router=require('express').Router({mergeParams:true});
const {isAuth}= require('../middleware/isAuth');
const {getStudents,deleteStudent}=require('../controllers/student');

router.route('/').get(isAuth,getStudents).delete(isAuth,deleteStudent);

module.exports=router;