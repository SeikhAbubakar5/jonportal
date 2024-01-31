const express=require("express");
const app=express();
const mongoose=require("mongoose");
const morgan=require("morgan");
const bodyParser=require("body-parser");
require("dotenv").config();
var cors=require("cors");
const cookieParser = require("cookie-parser");
const authRoutes=require("./routes/authroutes")
const userRoutes=require("./routes/userRoutes")
const jobTypeRoutes=require("./routes/jobTypeRoutes")
const jobRoutes=require("./routes/jobsRoutes")

// database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("DB connected")).catch((error)=>console.log(error));
// middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:"10mb"}))
app.use(bodyParser.urlencoded({
    limit:"10mb",
    extended:true
}))
app.use(cookieParser())
app.use(cors())


//routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',jobTypeRoutes);
app.use('/api',jobRoutes);

// routes
// app.get('/',(req ,res)=>{
//     res.send("hellow form node")
// })
//error middleware

const port=process.env.PORT || 8000;

app.listen(port ,()=>{
    console.log(`server listening on port ${port}`);
})