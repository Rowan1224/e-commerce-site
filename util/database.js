// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'rowan',
//     database : 'testWeb',
//     password:''

// });

// module.exports = pool.promise();


const Sequelize = require('sequelize');

const sequelize = new Sequelize('testWeb','rowan','',{dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;