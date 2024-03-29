const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const jobTypeSehema=new mongoose.Schema({
    jobTypeName:{
        type:String,
        trim:true,
        required:[true,"job category is required"],
        maxLength:70,
    },
    user:{
        type:ObjectId,
        ref:"User" ,
        required:true,
    },
    
},{timestamps:true})
module.exports = mongoose.model("JobType",jobTypeSehema)