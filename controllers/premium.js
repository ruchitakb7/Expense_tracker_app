const User=require('../models/user');
const Expense=require('../models/expense');
const Order=require('../models/order');
const sequelize=require('../util/database');


 const getUserLeaderBoard=async (req,res,next)=>{

    try {

        const userLeaderBoardDetails=await User.findAll({ 
        order:[['totalExpenses', 'DESC']],
        attributes:['name','totalExpenses']
        });
        //console.log(userLeaderBoardDetails)
        res.json(userLeaderBoardDetails)

    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
 }

 module.exports = {
    getUserLeaderBoard
 }