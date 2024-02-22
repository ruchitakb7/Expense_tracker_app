const { userInfo } = require('os');
const Signup=require('../models/signup');
const path= require('path');

exports.login = async(req,res,next) =>{
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}


exports.checkuser= async(req,res,next) =>{
    const {email,password} = req.body;

   console.log(email)
    try{   
        const checkinfo=  await Signup.findAll({
            where: {
              email:email,
            },
          });
          
          if(checkinfo.length>0)
          {
            console.log('xx')
             if(password == checkinfo[0].password)
             {
                console.log(checkinfo[0].password)
                return res.status(200).json({message:"User Has Logged In Successfully"})
             }
             else
             {
                console.log(checkinfo[0].password)
                return res.status(401).json({message:"User Not Authorized"})
             }
          }
          else{
            return res.status(404).json({message:"User Not Found"})
          }
       
    }
    catch(e){
        res.status(400).json({error:"Something Went Wrong"})
    }
}

