const express= require('express');
const app= express();

const path=require('path');

const seq = require('./util/database.js');

const  Signup= require('./models/signup.js');

app.use(express.json());
app.use(express.static('public')) 
app.use(express.static(path.join(__dirname, "views"))) 


const routerfile= require('./routes/router.js');   
app.use(routerfile);

seq.sync()
.then(res=>
   { 
    app.listen(1020);  
})                               
.catch((e)=>{
   console.log(e)

})
