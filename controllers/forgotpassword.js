const User= require('../models/user');
const path= require('path')

exports.forgotpasswordForm= (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','forgotpassword.html'))
}

exports.forgotpassword=async (req,res,next)=>{
    try{

        const email= req.params.email;
        console.log(email);
        const response= await User.findOne({where:{email:email}})
        res.json(response);

    }
    catch(e){console.log(e)}
}