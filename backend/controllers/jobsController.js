const Job=require("../models/jobModel");

//create category
exports.createJob=async (req,res,next)=>{
    try {
        const job=await Job.create({
            title:req.body.title,
            description:req.body.description,
            salary:req.body.salary,
            location:req.body.location,
            jobType:req.body.jobType,
            user:req.user.id
        })
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
}
//singlr job
exports.singleJob=async (req,res,next)=>{
    try {
        const job=await Job.findById(req.params.id)
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
}

//showjobs
exports.showJobs=async (req,res,next)=>{
    const keyword=req.query.keyword ? {
        title:{
            $regex:req.query.keyword ,
            $options:'i'
        }
    }:{}
     //paginations
     const pageSize=5;
     const page=Number(req.query.pageNumber) ||1;
     const count=await Job.find({...keyword}).countDocuments();
    try {
        const jobs=await Job.find({...keyword}).skip(pageSize*(page-1)).limit(pageSize)
        res.status(200).json({
            success:true,
            jobs,
            page,
            pages:Math.ceil(count/pageSize),
            count
        })
    } catch (error) {
        next(error)
    }
}