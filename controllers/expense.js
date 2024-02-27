const path= require('path');
const Expense= require('../models/expense');
const User= require('../models/user');
const sequelize = require('../util/database');



exports.expensePage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','expense.html'));
}


exports.addExpense= async(req,res,next) =>
{
    try{
       // console.log(req.user.id)
        const expenseAmount=req.body.expenseAmount;
        const expenseDescription=req.body.expenseDescription;
        const expenseCategory=req.body.expenseCategory;

        const expensedata= await Expense.create({
             expenseAmount:expenseAmount,
            expenseDescription:expenseDescription,
            expenseCategory:expenseCategory,
            userId:req.user.id
        })
        
        res.json(expensedata)
    }
    catch(e)
    {
        res.status(500).json({e})
    }
}


exports.expenseSheet= async(req,res,next) =>{
    try{

        const sheet= await Expense.findAll({where:{userId:req.user.id}})
        const premiumcheck= await User.findByPk(req.user.id);
        
        res.status(201).json({expenses:sheet,premium:premiumcheck});
    }
    catch(e){
        res.status(500).json(e);
    }
}

exports.deleteExpense= async(req,res,next) =>{
    try{
        const id = req.params.id;
        const response=await Expense.destroy({where:{id:id}})
        res.json({message:'Expense  Deleted'});

    }
    catch(e)
    {
        console.log(e)
    }
}


exports.updateTotalExpense=async (req,res,next)=>{

    try{
        
       const a= await Expense.sum('expenseAmount',{where:{userId:req.user.id}})
       const userupdate= await User.update({'totalExpenses':a},{where:{id:req.user.id}})
        res.json(userupdate);
     }
     catch(e){console.log(e)}
 }



