const express= require('express')

const router = express.Router()

const forgotpasswordContoller= require('../controllers/forgotpassword');

router.get('/forgotpassword',forgotpasswordContoller.forgotpasswordForm)

router.put('/forgotpassword/password/:email',forgotpasswordContoller.forgotpassword)


module.exports=router