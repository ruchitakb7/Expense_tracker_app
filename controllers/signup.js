const { create } = require('domain');
const Signup=require('../models/signup');

const path= require('path');

exports.signupage= (req,res,next)=>{

    res.sendFile(path.join(__dirname, '..','views','signup.html'))

}

exports.signupdetails= async (req,res,next) =>{
    const name= req.body.name;
    const email=req.body.email;
    const password= req.body.password;
    console.log(name);
    try{
        const signupdetail= await Signup.create({
            name:name,
            email:email,
            password:password
        })
        res.json(signupdetail)
    }
    catch(e)
    {console.log(e)}
}