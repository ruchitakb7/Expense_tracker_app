const Signup=require('../models/signup');
const path= require('path');

exports.login = async(req,res,next) =>{
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}


exports.checkuser= async(req,res,next) =>{
    const email= req.paramsemail;

   console.log(email)
    try{   
        const checkinfo=  await Signup.findAll({
            where: {
              email:email,
            },
          });
       
        res.status(201).json(checkinfo)
    }
    catch(e){
        res.status(400).json({error:e})
    }
}

