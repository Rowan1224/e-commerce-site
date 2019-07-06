const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Transaction = sequelize.define('transaction',{

 id:{
   type : Sequelize.INTEGER,
   autoIncrement : true,
   allowNull : false,
   primaryKey: true

 },
 cashINid : Sequelize.INTEGER,
 cashOUTid : Sequelize.INTEGER,
 tranId : Sequelize.STRING,
 amount : Sequelize.INTEGER

});

module.exports = Transaction;