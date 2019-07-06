const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order',{

 id:{
   type : Sequelize.INTEGER,
   autoIncrement : true,
   allowNull : false,
   primaryKey: true 

 },
 orderId : Sequelize.STRING,
 productId : Sequelize.INTEGER,
 qty : Sequelize.INTEGER

});

module.exports = Order;