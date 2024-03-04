const path= require('path');
const Expense= require('../models/expense');
const User= require('../models/user');
const sequelize = require('../util/database');
const s3service = require('../service/s3service');
const userservices= require('../service/userservices')
//const { json } = require('sequelize');


exports.expensePage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','expense.html'));
}


exports.addExpense= async(req,res,next) =>
{
    const t = await sequelize.transaction();
    try{
       
        const expenseAmount=req.body.expenseAmount;
        const expenseDescription=req.body.expenseDescription;
        const expenseCategory=req.body.expenseCategory;

            const expensedata= await Expense.create({
            expenseAmount:expenseAmount,
            expenseDescription:expenseDescription,
            expenseCategory:expenseCategory,
            userId:req.user.id},
            {
                transaction:t
            })
        
           await t.commit();
        res.json(expensedata)
    }
    catch(e)
    {   
       await t.rollback();
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
        const t = await sequelize.transaction();
        const id = req.params.id;
        const response=await Expense.destroy({where:{id:id}},{transaction:t})
        await t.commit();
        res.json({message:'Expense  Deleted'});

    }
    catch(e)
    { 
        await t.rollback()
        console.log(e)
    }
}


exports.updateTotalExpense=async (req,res,next)=>{

    try{
        const t = await sequelize.transaction();
        const a= await Expense.sum('expenseAmount',{where:{userId:req.user.id}})
        const userupdate= await User.update({'totalExpenses':a},{where:{id:req.user.id}},{transaction:t})
        await t.commit();
        res.json(userupdate);
     }
     catch(e){
        await t.rollback();
        console.log(e)
    }
 }

 exports.downloadexpense= async(req,res,next) =>{
 
    try{
        const userid= req.user.id;
        const expensedata = await userservices.getExpenses(req)
        const stringfyexpensedata= JSON.stringify(expensedata)

        
        const filename = `Expense${userid}/${new Date()}.txt`;
        const fileURL = await s3service.uploadToS3(stringfyexpensedata,filename)
        res.status(200).json({ fileURL, success: true, err: null });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ fileURL: '', success: false, err: err })
    }

   
 }


