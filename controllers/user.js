const asyncHandler=require('../middleware/async');
const User =require('../model/User');
const {generateError}=require('../util/error');

//@desc   register user
//@route  POST /api/v1/user/register
//@access Public

exports.register=asyncHandler(async(req,res,next)=>{
    const {name,email,role,password}=req.body;
    const isUserAvailable=await User.find({email:email});
    if (isUserAvailable){
        throw generateError('user already exist',409);
    }
    const encryptedPassword=encryptPassword(password);
    

})