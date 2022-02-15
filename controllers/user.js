const asyncHandler=require('../middleware/async');
const User =require('../model/User');
const {generateError}=require('../util/error');
const {encryptPassword}=require('../util/encryptPassword');
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
    const user=new User({
        name:name,
        email:email,
        role:role,
        password:encryptedPassword
    })
    await user.save();

    res.status(200).json({success:true,message:'user registered successfully',data:user})

})