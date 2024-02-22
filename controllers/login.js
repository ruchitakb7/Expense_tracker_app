const { userInfo } = require('os');
const Signup=require('../models/signup');
const path= require('path');
const bcrypt = require('bcrypt');

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

exports.login = async(req,res,next) =>{
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}


exports.checkuser= async(req,res,next) =>{
    try{ 

    const {email,password} = req.body;

    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail id or password is missing ', success: false})
    }

     
        const user=  await Signup.findAll({
            where: {
              email:email,
            },
          });
        
          if(user.length > 0)
          {
              bcrypt.compare(password,user[0].password, async(err,result)=>{
                if (err) 
                {
                  throw new err("something Went Wrong")
                }  
                if(result==true)
                {
                    return res.status(200).json({success:true, message: "User logged in successfully"});

                }
                else
                {
                    return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
            }) 
          }
          else 
          {
              return res.status(404).json({success: false,message: 'user not exist'})
          }
       
    }
    catch(err){
        res.status(500).json({err})
    }
}

