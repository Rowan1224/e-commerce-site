const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserOrder = sequelize.define('UserOrder',{

 id:{
   type : Sequelize.INTEGER,
   autoIncrement : true,
   allowNull : false,
   primaryKey: true 

 },
 orderId : Sequelize.STRING,
 userId : Sequelize.INTEGER,
 status : Sequelize.STRING,
 price : Sequelize.INTEGER

});

module.exports = UserOrder;