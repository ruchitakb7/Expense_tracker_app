const Sequelize = require('sequelize');

 const sequelize = new Sequelize('expense_project', 'root', 'ruchita123@', {
    host:"localhost",
    dialect: "mysql",
     logging: false
}); 

module.exports=sequelize
