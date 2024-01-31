const mongoose=require('mongoose');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const userSehema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,"first name required"],
        
    },
    lastName:{
        type:String,
        trim:true,
        required:[true,"last name required"],
        
    },
    email:{
        type:String,
        trim:true,
        required:[true,"email is required"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ,"enter valid email"],
    },
    password:{
        type:String,
        trim:true,
        required:[true,"password required"],
        minlength:[6,"password must be 6 char"],
    },
    role:{
        type:Number,
       default:0,
    },
},{timestamps:true})

userSehema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});
userSehema.methods.comparePassword=async function(enteredPasswoed){
    return await bcrypt.compare(enteredPasswoed,this.password)
}
userSehema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:3600
    })
}
module.exports = mongoose.model("User",userSehema)

