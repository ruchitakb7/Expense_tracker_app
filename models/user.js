const Sequelize = require('sequelize');

const sequelize=require('../util/database');

const Signup = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        uniqueKey:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ispremiumuser: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      totalExpenses :{
      type:Sequelize.INTEGER,
      defaultValue:0
    }
})

module.exports=Signup;