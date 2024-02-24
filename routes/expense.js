const express = require('express');
const router = express.Router();


const expenseController= require('../controllers/expense');
const authontication= require('../middleware/auth');

router.get('/home',expenseController.expensePage);

router.post('/addExpense',authontication.authenticate,expenseController.addExpense);

router.get('/Expensesheet',authontication.authenticate,expenseController.expenseSheet);

router.delete('/deleteexpense/:id',authontication.authenticate,expenseController.deleteExpense);

module.exports=router;

