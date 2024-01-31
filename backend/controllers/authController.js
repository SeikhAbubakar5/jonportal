
const User =require("../models/userModel");


//     res.send("hellow")
// }
exports.signup = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      // Check if the email is already registered
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          success: false,
          error: "Email already registered",
        });
      }
      // Create the user
      const user = await User.create(req.body);
      // Respond with a success message
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      // Log the error for debugging
      console.error(error);
      // Check for duplicate key violation
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "Duplicate value entered",
        });
      }
      next(error);
    }
  };

  exports.signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Validation
      if (!email) {
        return res.status(400).json({ success: false, error: "Please provide an email" });
      }
  
      if (!password) {
        return res.status(400).json({ success: false, error: "Please provide a password" });
      }
  
      // Check user email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
  
      // Check password
      const isMatched = await user.comparePassword(password);
      if (!isMatched) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }
  
      // If everything is okay, send the token
      sendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  };
  
  const sendToken = async (user, codeStatus, res) => {
    try {
      const token = await user.getJwtToken();
      res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, token, user });
    } catch (error) {
      // Handle any error that might occur while sending the token
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  exports.logout=(req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:"logout"
    })
  }
//user profilr
  exports.userProfile= async (req,res,next)=>{

    const user =await User.findById( req.user.id).select('-password')
    res.status(200).json({
        success:true,
        user
    })
  }