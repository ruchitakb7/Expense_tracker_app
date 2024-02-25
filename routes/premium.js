const express=require('express');
const premiumController=require('../controllers/premium')
const userAuthenticate=require('../middleware/auth')


const router=express.Router();

router.get('/showleaderBoard',premiumController.getUserLeaderBoard);


module.exports=router;