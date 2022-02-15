const mongoose =require ("mongoose");
const colors=require("colors");

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://surajpatil:suraj5102000@cluster0.sy2xf.mongodb.net/class')
        console.log('connected to database'.green.bold)
    } catch (error) {
        console.log(error)
    }

}
module.exports=connectDB;