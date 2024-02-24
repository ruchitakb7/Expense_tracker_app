const express= require('express');
const app= express();

const path=require('path');

const seq = require('./util/database.js');
const User= require('./models/user.js');
const Expense= require('./models/expense.js');

app.use(express.json());
app.use(express.static('public')) 
app.use(express.static(path.join(__dirname, "views"))) 


const signuprouterFile= require('./routes/signuprouter.js');   
app.use(signuprouterFile);
const loginrouterFile = require('./routes/loginrouter.js');
app.use(loginrouterFile);
const expenseRouterFile= require('./routes/expense.js');
app.use(expenseRouterFile);

User.hasMany(Expense);
Expense.belongsTo(User);

seq.sync()
.then(res=>
   { 
    app.listen(1062);  
})                               
.catch((e)=>{
   console.log(e)

})
