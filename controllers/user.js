const asyncHandler=require('../middleware/async');
const User =require('../model/User');
const {generateError}=require('../util/error');
const {encryptPassword}=require('../util/encryptPassword');
const bcryptjs=require('bcryptjs')
//@desc   register user
//@route  POST /api/v1/user/register
//@access Public

exports.register=asyncHandler(async(req,res,next)=>{
 
    const {name,email,role,password}=req.body;
    const isUserAvailable=await User.findOne({email:email});
    console.log(isUserAvailable)
    if (isUserAvailable){
        throw generateError('user already exist',409);
    }
    const encryptedPassword=await encryptPassword(password);
    const user=new User({
        name:name,
        email:email,
        role:role,
        password:encryptedPassword
    })
    await user.save();

    res.status(200).json({success:true,message:'user registered successfully',data:user})

})

//@desc   login user
//@route  GET /api/v1/user/login
//@access Public

exports.login=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
    const user=await User.findOne({email:email}).select("+password");
    if (!user){
        throw generateError('no user found matching to this mail',404);
    }
    const isSame=await bcryptjs.compare(password,user.password)
    if (!isSame){
        throw generateError('please enter valid password',401)
    }
    
    res.status(200).json({success:true,message:'login successfull'})

})