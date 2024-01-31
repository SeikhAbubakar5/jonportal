const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

//check user is authenticated
exports.isAuthenticated=async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({ success: false, error: "nor auth to access this route" });
    }
    try {
        const decoded=jwt.verify(token ,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "nor auth to access this route" });
    }
}