const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Balance = sequelize.define('balance',{

 id:{
   type : Sequelize.INTEGER,
   autoIncrement : true,
   allowNull : false,
   primaryKey: true

 },
 userId : Sequelize.INTEGER,
 currentBalance : Sequelize.INTEGER,
 secretPin : Sequelize.STRING

});

module.exports = Balance;