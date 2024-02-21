//const { create } = require('domain');
const Signup=require('../models/signup');

const path= require('path');

exports.signupage= (req,res,next)=>{

    res.sendFile(path.join(__dirname, '..','views','signup.html'))

}

exports.signupdetails= async (req,res,next) =>{
    const name= req.body.name;
    const email=req.body.email;
    const password= req.body.password;
  
    try{
        const signupdetail= await Signup.create({
            name:name,
            email:email,
            password:password
        })
        res.status(201).json(signupdetail)
    }
    catch(e)
    {res.status().json({error:e})}
}


exports.checkemail= async(req,res,next) =>{
    try{
       
        const checkinfo= await Signup.findAll();
       
        res.status(201).json(checkinfo)
    }
    catch(e){
        res.status(400).json({error:e})
    }
}