const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Supplier = sequelize.define('supplier',{

 id:{
   type : Sequelize.INTEGER,
   autoIncrement : true,
   allowNull : false,
   primaryKey: true

 },
 price : Sequelize.INTEGER,
 orderId : Sequelize.STRING,
 tranId : Sequelize.STRING,
 validation : Sequelize.BOOLEAN
 

});

module.exports = Supplier;