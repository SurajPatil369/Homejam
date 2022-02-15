const mongoose=require('mongoose');
const Schema=mongoose.Schema

const userSchema=new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:[true,'please enter your email'],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please add the valid email",]
},
role:{
    type:String,
    required:[true,'role can be either student or instructor'],
    enum:['instructor','student']
},
password:{
    type : String,
    required: [true,'please add password'],
    select:false
},
resetPasswordToken:String,
resetPasswordExpire:Date,
classes:[{type:mongoose.Schema.ObjectId, ref:'Class'}],
createdAt:{
    type: Date,
    default:Date.now
},
});

module.exports=mongoose.model('User',userSchema)