const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const jobSehema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,"title required"],
        maxLength:70,
    },
    description:{
        type:String,
        trim:true,
        required:[true,"description required"],
    },
    salary:{
        type:String,
        trim:true,
        required:[true,"salary required"],     
    },
    location:{
        type:String,
    },
    available:{
        type:Boolean,
        default:true, 
    },
    jobType:{
        type:ObjectId,
        ref:"JobType" ,
        required:true,
    },
    user:{
        type:ObjectId,
        ref:"User" ,
        required:true,
    },
    
},{timestamps:true})
module.exports = mongoose.model("Job",jobSehema)