

const express = require("express");
const cors = require("cors");
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true,
}))
app.use(router);
app.listen(5000,()=>{
    console.log("app is listening at 5000")
})
router.post("/send-email" ,async(req,res)=>{
    try{
        const {email} =  req.body;
        let emailSender=nodemailer.createTransport({
            host:process.env.HOST,
            port: 587,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            },
            debug:true,
        });

        let info =await emailSender.sendMail({
            from:`lokesh setlem`,
            to:email,
            subject:"Email from Me",
            html:`<p> email from compozent </p>`
        })
        console.log( "user",info)
        res.status(200).json({
            email,
            success:true,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


