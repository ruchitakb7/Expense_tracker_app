const express = require('express');
const router = express.Router();

const expenseController= require('../controllers/expense');

router.get('/home',expenseController.expensePage);

router.post('/addExpense',expenseController.addExpense);

router.get('/Expensesheet',expenseController.expenseSheet);

router.delete('/deleteexpense/:id',expenseController.deleteExpense);

module.exports=router;

