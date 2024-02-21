const express= require('express');
const router= express.Router()

const logincontroller= require('../controllers/login');


router.get('/login',logincontroller.login);

router.get('/checkuser/:email',logincontroller.checkuser)



module.exports=router;