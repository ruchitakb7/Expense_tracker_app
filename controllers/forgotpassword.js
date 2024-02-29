const User = require('../models/user');

const Sib = require('sib-api-v3-sdk');

const bcrypt = require('bcrypt');

const dotenv = require('dotenv');

dotenv.config();

const path=require('path')


exports.forgotpasswordForm = async (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','forgotpassword.html'))
}


exports.forgotpassword = async (req, res, next) => {

    try {
        const email= req.body.email

        const user = await User.findOne({ where: { email: email } });

        if (user) {
           
            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.api_key

            const sender = {
                email: process.env.myemail,
                name: 'Admin'
            }

            const receivers = [{
                email: email
            }]

            let tranEmailApi = new Sib.TransactionalEmailsApi()

            tranEmailApi.sendTransacEmail({
                subject: "reset password email", sender,
                to: receivers,
                htmlContent: `Forgot Password`
                   
            })
                .then((result) => {
                    console.log(result);
                    return res.status(202).json({
                        success: true,
                        message: "reset password link has been sent to your email",
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            throw new Error("User doesn't exist");
        }

    }

    catch (err) {
        console.log('err', err.message)
    }
}




